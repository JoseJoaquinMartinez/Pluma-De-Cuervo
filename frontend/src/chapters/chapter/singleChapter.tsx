"use client";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import { fetchSingleChapter } from "@/store/slices/chapter/thunks/fetchSingleChapter";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TitlesFromChapterComponent } from "../components/TitlesFromChapterComponent";
import { ChapterReadArea } from "../components/ChapterReadArea";

interface Props {
  bookId: number;
  chapterId: number;
}

export const SingleChapter = ({ bookId, chapterId }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: chapter,
    loading,
    error,
  } = useSelector((state: RootState) => state.getSingleChapter);

  useEffect(() => {
    if (!chapter || chapter.id !== chapterId) {
      dispatch(fetchSingleChapter({ bookId, chapterId }));
    }
  }, [chapterId, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <BookLoaderComponent />
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }

  if (!chapter) {
    return <div>Capítulo no encontrado</div>;
  }
  //TODO añadir botones para ir al siguiente o anterior capítulo
  return (
    <article className="flex flex-col max-w-screen-xl">
      <TitlesFromChapterComponent {...chapter} />
      <ChapterReadArea {...chapter} />
    </article>
  );
};
