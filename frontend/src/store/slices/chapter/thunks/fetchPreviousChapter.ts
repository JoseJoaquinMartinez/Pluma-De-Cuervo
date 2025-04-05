import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ChapterProps } from "@/chapters/chapter/interface/chapter";

interface FetchPreviousChapterParams {
  bookId: number;
  chapterId: number;
}

export const fetchPreviousChapter = createAsyncThunk<
  ChapterProps,
  FetchPreviousChapterParams,
  { rejectValue: string }
>(
  "getSingleChapter/fetchPreviousChapter",
  async ({ bookId, chapterId }, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/book/previous-chapter/${bookId}/${chapterId}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          return thunkAPI.rejectWithValue("No hay más capítulos.");
        }
        throw new Error("Error al cargar el siguiente capítulo.");
      }

      const nextChapter: ChapterProps = await response.json();
      return nextChapter;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Error desconocido."
      );
    }
  }
);
