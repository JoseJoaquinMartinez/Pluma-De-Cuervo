import { createSlice } from "@reduxjs/toolkit";
import { LastTenChapterProp } from "@/app/(un-auth-regular-user)/ultimos-capitulos/interface/interface";
import { fetchLastTenChapters } from "@/store/slices/lastTenChapters/thunks/fetchLastTenChapters";

const initialState: {
  data: LastTenChapterProp[];
  loading: boolean;
  error: string | null;
} = {
  data: [],
  loading: false,
  error: null,
};

const lastTenChaptersSlice = createSlice({
  name: "lastTenChapters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLastTenChapters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLastTenChapters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLastTenChapters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default lastTenChaptersSlice.reducer;
