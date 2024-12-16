import { createSlice } from "@reduxjs/toolkit";
import { fetchAllBlogs } from "./thunks/fetchAllBlogs";
import type { Blogs } from "@/blogs/interface/blogs";

const initialState: {
  data: Blogs | null;
  loading: boolean;
  error: string | null;
} = {
  data: null,
  loading: false,
  error: null,
};

const allBlogsSlice = createSlice({
  name: "allBlogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default allBlogsSlice.reducer;
