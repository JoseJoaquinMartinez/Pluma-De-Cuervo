import { createSlice } from "@reduxjs/toolkit";
import { fetchOtherWorks } from "@/store/slices/otherWorks/thunks/fetchOtherWorks";
import type { OtherWorkComponentProps } from "@/homepage/other-works/interface/other-works-interface";

const initialState: {
  data: OtherWorkComponentProps[];
  loading: boolean;
  error: string | null;
  fetched: boolean;
} = {
  data: [],
  loading: false,
  error: null,
  fetched: false,
};

const otherWorksSlice = createSlice({
  name: "otherWorks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOtherWorks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOtherWorks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
        state.fetched = true;
      })
      .addCase(fetchOtherWorks.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.fetched = true;
      });
  },
});
export default otherWorksSlice.reducer;
