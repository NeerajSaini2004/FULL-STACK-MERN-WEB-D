import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    lectures: []
}


export const getCourseLectures = createAsyncThunk("/course/lecture/get", async (cid) => {
    try {
        const response = await axiosInstance.get(`/courses/${cid}`);
        return response.data;
    } catch(error) {
        const errorMessage = error?.response?.data?.message || "Failed to load lectures";
        toast.error(errorMessage);
        throw error;
    }
});

export const addCourseLecture = createAsyncThunk("/course/lecture/add", async (data) => {
    try {
        const formData = new FormData();
        formData.append("lecture", data.lecture);
        formData.append("title", data.title);
        formData.append("description", data.description);

        const response = await axiosInstance.post(`/courses/${data.id}`, formData);
        toast.success("Lecture added successfully");
        return response.data;
    } catch(error) {
        const errorMessage = error?.response?.data?.message || "Failed to add lecture";
        toast.error(errorMessage);
        throw error;
    }
});

export const deleteCourseLecture = createAsyncThunk("/course/lecture/delete", async (data) => {
    try {

        const response = axiosInstance.delete(`/courses/${data.courseId}/lectures/${data.lectureId}`);
        toast.promise(response, {
            loading: "deleting course lecture",
            success: "Lecture deleted successfully",
            error: "Failed to delete the lectures"
        });
        return (await response).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});


const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCourseLectures.fulfilled, (state, action) => {
            console.log(action);
            state.lectures = action?.payload?.lectures;
        })
        .addCase(addCourseLecture.fulfilled, (state, action) => {
            if(action?.payload?.course?.lectures) {
                state.lectures = action.payload.course.lectures;
            }
        })
    }
});

export default lectureSlice.reducer;