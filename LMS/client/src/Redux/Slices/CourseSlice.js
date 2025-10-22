import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData: [],
    loading: false,
    error: null
}

export const getAllCourses = createAsyncThunk("/course/get", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/courses");
        return response.data.courses || [];
    } catch(error) {
        console.error('Failed to load courses:', error);
        toast.error(error?.response?.data?.message || "Failed to load courses");
        return rejectWithValue(error?.response?.data?.message || "Failed to load courses");
    }
}); 

export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
    try {
        const response = axiosInstance.delete(`/courses/${id}`);
        toast.promise(response, {
            loading: "deleting course ...",
            success: "Courses deleted successfully",
            error: "Failed to delete the courses",
        });

        return (await response).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
}); 

export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
    try {
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);

        const response = await axiosInstance.post("/courses", formData);
        toast.success("Course created successfully");
        return response.data;

    } catch(error) {
        const errorMessage = error?.response?.data?.message || "Failed to create course";
        toast.error(errorMessage);
        throw error;
    }
});

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courseData = action.payload || [];
                state.error = null;
            })
            .addCase(getAllCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to load courses";
                state.courseData = [];
            })
    }
});

export default courseSlice.reducer;