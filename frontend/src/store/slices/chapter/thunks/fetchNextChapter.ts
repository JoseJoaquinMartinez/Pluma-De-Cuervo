import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ChapterProps } from "@/chapters/chapter/interface/chapter";

interface FetchNextChapterParams {
  bookId: number;
  chapterId: number;
}

export const fetchNextChapter = createAsyncThunk<
  ChapterProps,
  FetchNextChapterParams,
  { rejectValue: string }
>(
  "getSingleChapter/fetchNextChapter",
  async ({ bookId, chapterId }, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/book/next-chapter/${bookId}/${chapterId}`
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
