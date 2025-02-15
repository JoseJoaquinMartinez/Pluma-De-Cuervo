import { createSlice } from "@reduxjs/toolkit";
import { fetchSingleBlog } from "./thunks/fetchSingleBlog";
import type { SingleBlog } from "@/blogs/interface/blogs";

const initialState: {
  data: SingleBlog | null;
  loading: boolean;
  error: string | null;
} = {
  data: null,
  loading: false,
  error: null,
};
const singleBlogSlice = createSlice({
  name: "SingleBlog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSingleBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default singleBlogSlice.reducer;
