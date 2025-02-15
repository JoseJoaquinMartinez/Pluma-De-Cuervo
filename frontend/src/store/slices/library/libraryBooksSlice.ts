import { createSlice } from "@reduxjs/toolkit";
import { fetchLibraryBooks } from "@/store/slices/library/thunks/fecthLibraryBooks";
import { BookCardComponentProps } from "@/books/interfaces/bookData";

const initialState: {
  data: BookCardComponentProps[];
  loading: boolean;
  error: string | null;
} = {
  data: [],
  loading: false,
  error: null,
};

const libraryBooksSlice = createSlice({
  name: "libraryBooks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLibraryBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLibraryBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchLibraryBooks.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default libraryBooksSlice.reducer;
