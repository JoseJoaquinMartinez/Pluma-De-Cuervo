"use client";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import { fetchSingleChapter } from "@/store/slices/chapter/thunks/fetchSingleChapter";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TitlesFromChapterComponent } from "../components/TitlesFromChapterComponent";
import { ChapterReadArea } from "../components/ChapterReadArea";
import Link from "next/link";
import ErrorToast from "@/components/shared/ErrorToaster";
import CommentParagraphBanner from "@/components/shared/CommentParagraphBanner";

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
  const { isLoggedIn, data } = useSelector(
    (state: RootState) => state.Authentication
  );

  useEffect(() => {
    if (!chapter || chapter.id !== chapterId) {
      dispatch(fetchSingleChapter({ bookId, chapterId }));
    }
  }, [chapterId, dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <BookLoaderComponent />
      </div>
    );
  }
  if (error) {
    return <ErrorToast message={error} />;
  }

  if (!chapter) {
    return <div>Capítulo no encontrado</div>;
  }
  //TODO añadir botones para ir al siguiente o anterior capítulo
  return (
    <article className="flex flex-col max-w-screen-xl">
      {data ? (
        <TitlesFromChapterComponent
          {...chapter}
          data={data}
          isLoggedIn={isLoggedIn}
          chapterId={chapterId}
          bookId={bookId}
        />
      ) : (
        <TitlesFromChapterComponent
          {...chapter}
          chapterId={chapterId}
          bookId={bookId}
        />
      )}
      {!isLoggedIn && (
        <>
          <p className="text-mainText text-xl self-center">
            Tu perspectiva importa.{" "}
            <Link href={"/auth/singup"} className="text-encabezados">
              Registrate
            </Link>
            , comenta y enriquece las historias desde dentro. 🖋️
          </p>
          <CommentParagraphBanner />
        </>
      )}

      <ChapterReadArea {...chapter} />
    </article>
  );
};
