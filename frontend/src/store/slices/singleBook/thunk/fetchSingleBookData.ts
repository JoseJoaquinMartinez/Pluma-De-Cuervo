import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSingleBook } from "@/books/book/utils/getSingleBook";

export const fetchSingleBookData = createAsyncThunk<
  BookCardComponentProps,
  number,
  { rejectValue: string }
>("FetchSingleBookData/fetchSingleBookData", async (id, thunkAPI) => {
  try {
    return await getSingleBook(id);
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(
        error.message || "Error obteniendo la información del libro",
      );
    }
    return thunkAPI.rejectWithValue("Error desconocido");
  }
});
