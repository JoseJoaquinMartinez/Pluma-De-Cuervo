import { createAsyncThunk } from "@reduxjs/toolkit";
import getLastFiveBlogs from "@/homepage/blogs/utils/getLastFiveBlogs";

export const fetchBlogHomepage = createAsyncThunk(
  "blogHomepage/fetchBlogHomepage",
  async (_, thunkAPI) => {
    try {
      const blogs = await getLastFiveBlogs();
      return blogs;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Error fetching blogs");
    }
  },
);
