import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSingleChapter } from "@/chapters/chapter/utils/getSingleChapter";
import { ChapterProps } from "@/chapters/chapter/interface/chapter";

interface FetchSingleChapterParams {
  bookId: number;
  chapterId: number;
}

export const fetchSingleChapter = createAsyncThunk<
  ChapterProps,
  FetchSingleChapterParams,
  { rejectValue: string }
>(
  "fetchSingleChapter/fetchSingleChapter",
  async ({ bookId, chapterId }, thunkAPI) => {
    try {
      const response = await getSingleChapter(chapterId, bookId);
      if (!response) {
        throw new Error("Capítulo no encontrado");
      }
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(
          error.message || "Error obteniendo el capítulo"
        );
      }
      return thunkAPI.rejectWithValue("Error desconocido");
    }
  }
);
