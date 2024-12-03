import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLastFiveChapters } from "@/books/book/utils/getLastFiveChapters";
import { LastFiveChapters } from "@/books/interfaces/bookData";

export const fetchLastFiveChapters = createAsyncThunk<
  LastFiveChapters[],
  number,
  { rejectValue: string }
>("fetchLastFiveChapters/fetchLastFiveChapters", async (id, thunkAPI) => {
  try {
    return await getLastFiveChapters(id);
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(
        error.message || "Error obteniendo la información del libro",
      );
    }
    return thunkAPI.rejectWithValue("Error desconocido");
  }
});
