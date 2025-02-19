import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllChaptersFromABook } from "../../../../books/book/utils/getAllChaptersFromBook";
import { Chapter } from "@/books/interfaces/bookData";

export const fetchAllChaptersFromABook = createAsyncThunk<
  Chapter[],
  number,
  { rejectValue: string }
>(
  "fetchAllChaptersFromABook/fetchAllChaptersFromABook",
  async (bookId, thunkAPI) => {
    try {
      const response = await getAllChaptersFromABook(bookId);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(
          error.message || "Error obteniendo los capítulos del libro"
        );
      }
      return thunkAPI.rejectWithValue("Error desconocido");
    }
  }
);
