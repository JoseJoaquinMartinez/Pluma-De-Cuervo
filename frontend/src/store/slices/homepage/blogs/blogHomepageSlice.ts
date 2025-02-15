import { createSlice } from "@reduxjs/toolkit";
import { fetchBlogHomepage } from "@/store/slices/homepage/blogs/thunks/blogThunks";
import { BlogHomepageState } from "@/store/slices/homepage/interfaces/blog";

const initialState: {
  data: BlogHomepageState[];
  loading: boolean;
  error: string | null;
  fetched: boolean;
} = {
  data: [],
  loading: false,
  error: null,
  fetched: false,
};

const blogHomepageSlice = createSlice({
  name: "blogHomepage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogHomepage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogHomepage.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.fetched = true;
      })
      .addCase(fetchBlogHomepage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.fetched = true;
      });
  },
});

export default blogHomepageSlice.reducer;
