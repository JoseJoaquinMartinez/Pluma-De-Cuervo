import { createSlice } from "@reduxjs/toolkit";
import { fetchLastFiveChapters } from "@/store/slices/singleBook/thunk/fetchLastFiveChapters";
import type { LastFiveChapters } from "@/books/interfaces/bookData";

const initialState: {
  data: LastFiveChapters[] | null;
  loading: boolean;
  error: string | null;
} = {
  data: null,
  loading: false,
  error: null,
};

const lastFiveChaptersSlice = createSlice({
  name: "lastFiveChapters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLastFiveChapters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLastFiveChapters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLastFiveChapters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default lastFiveChaptersSlice.reducer;
