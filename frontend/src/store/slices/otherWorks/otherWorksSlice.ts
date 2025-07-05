import { createSlice } from "@reduxjs/toolkit";
import { fetchOtherWorks } from "@/store/slices/otherWorks/thunks/fetchOtherWorks";
import { deleteOtherWork } from "@/store/slices/otherWorks/thunks/deleteOtherWorks";
import type { OtherWorkComponentProps } from "@/homepage/other-works/interface/other-works-interface";
import { revalidatePath } from "next/cache";

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
      })
      .addCase(deleteOtherWork.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOtherWork.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = state.data.filter(
          (otherWork) => otherWork.id !== action.payload.id
        );
      })
      .addCase(deleteOtherWork.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});
export default otherWorksSlice.reducer;
