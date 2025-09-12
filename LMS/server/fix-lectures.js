import { config } from 'dotenv';
config();
import Course from './models/course.model.js';
import connectToDB from './configs/dbConn.js';

async function fixLectures() {
  try {
    await connectToDB();
    
    // Find all courses with lectures
    const courses = await Course.find({ 'lectures.0': { $exists: true } });
    
    for (const course of courses) {
      let updated = false;
      
      for (const lecture of course.lectures) {
        // Fix broken video URLs
        if (lecture.lecture.secure_url.includes('res.cloudinary.com/du9jzqlpt/video/upload/v1674647316/sample.mp4')) {
          lecture.lecture.secure_url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
          lecture.lecture.public_id = 'sample_' + Date.now();
          updated = true;
          console.log(`Fixed lecture: ${lecture.title}`);
        }
      }
      
      if (updated) {
        await course.save();
        console.log(`Updated course: ${course.title}`);
      }
    }
    
    console.log('All lectures fixed!');
    process.exit(0);
  } catch (error) {
    console.error('Error fixing lectures:', error);
    process.exit(1);
  }
}

fixLectures();