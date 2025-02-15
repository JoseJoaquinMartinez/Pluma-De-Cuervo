import { createSlice } from "@reduxjs/toolkit";
import { fetchAllBlogs } from "./thunks/fetchAllBlogs";
import type { Blogs } from "@/blogs/interface/blogs";

const initialState: {
  data: Blogs;
  loading: boolean;
  error: string | null;
  fetched: boolean;
} = {
  data: [],
  loading: false,
  error: null,
  fetched: false,
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
        state.fetched = true;
      })
      .addCase(fetchAllBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.fetched = true;
      });
  },
});

export default allBlogsSlice.reducer;
