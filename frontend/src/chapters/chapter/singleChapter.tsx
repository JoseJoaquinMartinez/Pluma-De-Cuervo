"use client";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import { fetchSingleChapter } from "@/store/slices/chapter/thunks/fetchSingleChapter";
import { AppDispatch, RootState } from "@/store/store";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TitlesFromChapterComponent } from "../components/TitlesFromChapterComponent";
import { ChapterReadArea } from "../components/ChapterReadArea";
import Link from "next/link";
import ErrorToast from "@/components/shared/ErrorToaster";
import CommentParagraphBanner from "@/components/shared/CommentParagraphBanner";
import MainButton from "@/components/shared/mainButton";
import { fetchNextChapter } from "@/store/slices/chapter/thunks/fetchNextChapter";
import { useRouter } from "next/navigation";
import SuccessToast from "@/components/shared/SuccessToast";
import { resetState } from "@/store/slices/chapter/singleChapterSlice";

interface Props {
  bookId: number;
  chapterId: number;
}

export const SingleChapter = ({ bookId, chapterId }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
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
  }, [chapterId, dispatch, bookId, chapter]);

  const handleNextChapter = useCallback(async () => {
    dispatch(fetchNextChapter({ bookId, chapterId }))
      .unwrap()
      .then((nextChapter) => {
        router.push(`/libro/${bookId}/capitulos/capitulo/${nextChapter.id}`);
      })
      .catch((error) => {
        if (error === "No hay más capítulos.") {
          dispatch(resetState());
          router.push(`/libro/${bookId}`);
        } else {
          if (error instanceof Error) {
            <ErrorToast message={`Error inesperado ${error.message}`} />;
          } else {
            <ErrorToast message="Error inesperado" />;
          }
        }
      });
  }, [dispatch, bookId, chapterId, router]);

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
      {isLoggedIn && <CommentParagraphBanner />}
      {!isLoggedIn && (
        <>
          <p className="text-mainText text-xl self-center">
            Tu perspectiva importa.{" "}
            <Link href={"/auth/singup"} className="text-encabezados">
              Registrate
            </Link>
            , comenta y enriquece las historias desde dentro. 🖋️
          </p>
        </>
      )}

      <ChapterReadArea {...chapter} />
      <section className="flex justify-center gap-2 mt-2">
        <MainButton name="Siguiente" onClick={handleNextChapter} />
      </section>
    </article>
  );
};
