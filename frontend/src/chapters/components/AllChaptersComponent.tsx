"use client";
import ChapterCard from "@/app/(un-auth-regular-user)/ultimos-capitulos/components/ChapterCard";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import ErrorToast from "@/components/shared/ErrorToaster";
import { fetchAllChaptersFromABook } from "@/store/slices/singleBook/thunk/fetchAllChaptersFromABook";
import { RootState, AppDispatch } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const AllChaptersComponent = ({ bookId }: { bookId: number }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: chapters,
    loading,
    error,
  } = useSelector((state: RootState) => state.getAllChaptersFromABook);

  useEffect(() => {
    dispatch(fetchAllChaptersFromABook(bookId));
  }, [bookId, dispatch]);

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

  if (chapters) {
    return (
      <section className="flex flex-col max-w-screen-lg">
        <h2 className="text-encabezados text-2xl  text-start mb-4 self-start px-2 mt-4">
          Capítulos
        </h2>
        {chapters && chapters.length === 0 && (
          <p>No hay capítulos que mostrar</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {chapters.map(({ id, title, createdAt, imagen, bookImg }) => (
            <ChapterCard
              key={id}
              id={id}
              imagen={imagen}
              bookImg={bookImg}
              createdAt={createdAt}
              title={title}
              bookId={bookId}
            />
          ))}
        </div>
      </section>
    );
  }
};
