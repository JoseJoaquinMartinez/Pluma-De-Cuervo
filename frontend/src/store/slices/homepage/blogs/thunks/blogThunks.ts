import { createAsyncThunk } from "@reduxjs/toolkit";
import getLastFiveBlogs from "@/homepage/blogs/utils/getLastFiveBlogs";

export const fetchBlogHomepage = createAsyncThunk(
  "blogHomepage/fetchBlogHomepage",
  async (_, thunkAPI) => {
    try {
      return await getLastFiveBlogs();
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(
          error.message || "Error fetching blogs",
        );
      }
    }
  },
);
