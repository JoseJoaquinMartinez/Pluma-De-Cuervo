import { createSlice } from "@reduxjs/toolkit";
import { fetchSingleBookData } from "@/store/slices/singleBook/thunk/fetchSingleBookData";

const initialState: {
  data: BookCardComponentProps | null;
  loading: boolean;
  error: string | null;
} = {
  data: null,
  loading: false,
  error: null,
};

const singleBookSlice = createSlice({
  name: "singleBook",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleBookData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchSingleBookData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleBookData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default singleBookSlice.reducer;
