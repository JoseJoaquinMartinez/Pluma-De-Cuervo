import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBooksData } from "@/books/book/utils/getBooksData";
import { BookCardComponentProps } from "@/books/interfaces/bookData";

export const fetchLibraryBooks = createAsyncThunk<
  BookCardComponentProps[],
  void,
  { rejectValue: string }
>("libraryBooks/fetchLibraryBooks", async (_, thunkAPI) => {
  try {
    const books = await getBooksData();
    if (!books) {
      return thunkAPI.rejectWithValue("Error getting books");
    }
    return books;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(
        error.message || "Error obteniendo los libros de la biblioteca"
      );
    }
    return thunkAPI.rejectWithValue("Error desconocido");
  }
});
