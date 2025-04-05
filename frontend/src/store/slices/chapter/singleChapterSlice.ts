import { createSlice } from "@reduxjs/toolkit";
import { fetchSingleChapter } from "./thunks/fetchSingleChapter";
import type { ChapterProps } from "@/chapters/chapter/interface/chapter";
import { fetchNextChapter } from "./thunks/fetchNextChapter";
import { fetchPreviousChapter } from "./thunks/fetchPreviousChapter";

const initialState: {
  data: ChapterProps | null;
  loading: boolean;
  error: string | null;
} = {
  data: null,
  loading: false,
  error: null,
};

const getSingleChapterSlice = createSlice({
  name: "getSingleChapter",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSingleChapter.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchNextChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNextChapter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNextChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPreviousChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPreviousChapter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPreviousChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { resetState } = getSingleChapterSlice.actions;
export default getSingleChapterSlice.reducer;
