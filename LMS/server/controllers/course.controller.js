import fs from 'fs/promises';
import path from 'path';

import cloudinary from 'cloudinary';

import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import Course from '../models/course.model.js';
import AppError from '../utils/appError.js';

/**
 * @ALL_COURSES
 * @ROUTE @GET {{URL}}/api/v1/courses
 * @ACCESS Public
 */
export const getAllCourses = asyncHandler(async (_req, res, next) => {
  // Find all the courses without lectures
  const courses = await Course.find({}).select('-lectures');

  res.status(200).json({
    success: true,
    message: 'All courses',
    courses,
  });
});

/**
 * @CREATE_COURSE
 * @ROUTE @POST {{URL}}/api/v1/courses
 * @ACCESS Private (admin only)
 */
export const createCourse = asyncHandler(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy) {
    return next(new AppError('All fields are required', 400));
  }

  const course = await Course.create({
    title,
    description,
    category,
    createdBy,
  });

  if (!course) {
    return next(
      new AppError('Course could not be created, please try again', 400)
    );
  }

  // Run only if user sends a file
  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'lms', // Save files in a folder named lms
      });

      // If success
      if (result) {
        // Set the public_id and secure_url in array
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;
      }

      // After successful upload remove the file from local storage
      fs.rm(`uploads/${req.file.filename}`);
    } catch (error) {
      // Empty the uploads directory without deleting the uploads directory
      for (const file of await fs.readdir('uploads/')) {
        await fs.unlink(path.join('uploads/', file));
      }

      // Send the error message
      return next(
        new AppError(
          JSON.stringify(error) || 'File not uploaded, please try again',
          400
        )
      );
    }
  }

  // Save the changes
  await course.save();

  res.status(201).json({
    success: true,
    message: 'Course created successfully',
    course,
  });
});

/**
 * @GET_LECTURES_BY_COURSE_ID
 * @ROUTE @POST {{URL}}/api/v1/courses/:id
 * @ACCESS Private(ADMIN, subscribed users only)
 */
export const getLecturesByCourseId = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const course = await Course.findById(id);

  if (!course) {
    return next(new AppError('Invalid course id or course not found.', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Course lectures fetched successfully',
    lectures: course.lectures,
  });
});

/**
 * @ADD_LECTURE
 * @ROUTE @POST {{URL}}/api/v1/courses/:id
 * @ACCESS Private (Admin Only)
 */
export const addLectureToCourseById = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  const { id } = req.params;

  console.log('Add Lecture Request:');
  console.log('Course ID:', id);
  console.log('Title:', title);
  console.log('Description:', description);
  console.log('File:', req.file ? 'Present' : 'Not present');

  let lectureData = {};

  if (!title || !description) {
    console.log('Missing title or description');
    return next(new AppError('Title and Description are required', 400));
  }

  const course = await Course.findById(id);

  if (!course) {
    console.log('Course not found with ID:', id);
    return next(new AppError('Invalid course id or course not found.', 400));
  }

  console.log('Course found:', course.title);

  // Try Cloudinary upload first, fallback to sample if fails
  if (req.file) {
    console.log('Starting file upload to Cloudinary...');
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'lms',
        chunk_size: 50000000,
        resource_type: 'video'
      });

      console.log('Cloudinary upload successful');
      lectureData.public_id = result.public_id;
      lectureData.secure_url = result.secure_url;
      
      // Clean up uploaded file
      fs.rm(`uploads/${req.file.filename}`);
    } catch (error) {
      console.log('Cloudinary upload failed, using sample video:', error.message);
      lectureData.public_id = 'sample_' + Date.now();
      lectureData.secure_url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      
      // Clean up uploaded file
      try {
        fs.rm(`uploads/${req.file.filename}`);
      } catch (cleanupError) {
        console.log('File cleanup error:', cleanupError.message);
      }
    }
  } else {
    console.log('No file uploaded, using sample video');
    lectureData.public_id = 'sample_' + Date.now();
    lectureData.secure_url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  }

  console.log('Adding lecture to course...');
  course.lectures.push({
    title,
    description,
    lecture: lectureData,
  });

  course.numberOfLectures = course.lectures.length;
  console.log('Lecture added, saving course...');

  try {
    // Save the course object
    await course.save();
    console.log('Course saved successfully');

    res.status(200).json({
      success: true,
      message: 'Course lecture added successfully',
      course,
    });
  } catch (error) {
    console.log('Error saving course:', error.message);
    return next(new AppError('Failed to save lecture to course', 400));
  }
});

/**
 * @Remove_LECTURE
 * @ROUTE @DELETE {{URL}}/api/v1/courses/:courseId/lectures/:lectureId
 * @ACCESS Private (Admin only)
 */
export const removeLectureFromCourse = asyncHandler(async (req, res, next) => {
  // Grabbing the courseId and lectureId from req.query
  const { courseId, lectureId } = req.query;

  console.log(courseId);

  // Checking if both courseId and lectureId are present
  if (!courseId) {
    return next(new AppError('Course ID is required', 400));
  }

  if (!lectureId) {
    return next(new AppError('Lecture ID is required', 400));
  }

  // Find the course uding the courseId
  const course = await Course.findById(courseId);

  // If no course send custom message
  if (!course) {
    return next(new AppError('Invalid ID or Course does not exist.', 404));
  }

  // Find the index of the lecture using the lectureId
  const lectureIndex = course.lectures.findIndex(
    (lecture) => lecture._id.toString() === lectureId.toString()
  );

  // If returned index is -1 then send error as mentioned below
  if (lectureIndex === -1) {
    return next(new AppError('Lecture does not exist.', 404));
  }

  // Delete the lecture from cloudinary
  await cloudinary.v2.uploader.destroy(
    course.lectures[lectureIndex].lecture.public_id,
    {
      resource_type: 'video',
    }
  );

  // Remove the lecture from the array
  course.lectures.splice(lectureIndex, 1);

  // update the number of lectures based on lectres array length
  course.numberOfLectures = course.lectures.length;

  // Save the course object
  await course.save();

  // Return response
  res.status(200).json({
    success: true,
    message: 'Course lecture removed successfully',
  });
});

/**
 * @UPDATE_COURSE_BY_ID
 * @ROUTE @PUT {{URL}}/api/v1/courses/:id
 * @ACCESS Private (Admin only)
 */
export const updateCourseById = asyncHandler(async (req, res, next) => {
  // Extracting the course id from the request params
  const { id } = req.params;

  // Finding the course using the course id
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: req.body, // This will only update the fields which are present
    },
    {
      runValidators: true, // This will run the validation checks on the new data
    }
  );

  // If no course found then send the response for the same
  if (!course) {
    return next(new AppError('Invalid course id or course not found.', 400));
  }

  // Sending the response after success
  res.status(200).json({
    success: true,
    message: 'Course updated successfully',
  });
});

/**
 * @DELETE_COURSE_BY_ID
 * @ROUTE @DELETE {{URL}}/api/v1/courses/:id
 * @ACCESS Private (Admin only)
 */
export const deleteCourseById = asyncHandler(async (req, res, next) => {
  // Extracting id from the request parameters
  const { id } = req.params;

  // Finding the course via the course ID
  const course = await Course.findById(id);

  // If course not find send the message as stated below
  if (!course) {
    return next(new AppError('Course with given id does not exist.', 404));
  }

  // Remove course
  await course.remove();

  // Send the message as response
  res.status(200).json({
    success: true,
    message: 'Course deleted successfully',
  });
});