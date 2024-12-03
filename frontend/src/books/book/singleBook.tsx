"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import { fetchSingleBookData } from "@/store/slices/singleBook/thunk/fetchSingleBookData";
import { fetchLastFiveChapters } from "@/store/slices/singleBook/thunk/fetchLastFiveChapters";
import ChapterCard from "@/app/(un-auth-regular-user)/ultimos-capitulos/components/ChapterCard";
import Image from "next/image";

function SingleBook({ bookId }: { bookId: number }) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: book,
    loading,
    error,
  } = useSelector((state: RootState) => state.singleBook);
  const {
    data: lastFiveChapters,
    loading: lastFiveChaptersLoading,
    error: lastFiveChaptersError,
  } = useSelector((state: RootState) => state.lastFiveChapters);

  useEffect(() => {
    if (!book || book.id !== bookId) {
      dispatch(fetchSingleBookData(bookId));
      dispatch(fetchLastFiveChapters(bookId));
    }
  }, [bookId, book, dispatch]);

  if (loading) {
    return <BookLoaderComponent />;
  }
  if (error) {
    return <p>{error}</p>;
  }

  if (book) {
    return (
      <>
        <section
          className={
            "flex flex-col md:flex-row justify-start max-w-screen-xl gap-6 mt-10"
          }
        >
          <div className={"flex flex-col"}>
            <h2 className={"text-encabezados text-2xl  text-start"}>
              {book.title}
            </h2>
            <p className={"bg-cardsBackground text-mainText rounded-lg p-2"}>
              {book.Synopsis}
            </p>
          </div>
          <div>
            <Image
              src={book.imagen}
              alt={book.title}
              width={500}
              height={500}
            />
          </div>
        </section>
        <section>
          <h3>Capítulos</h3>
          {lastFiveChaptersLoading && <BookLoaderComponent />}
          {lastFiveChaptersError && <p>{lastFiveChaptersError}</p>}
          {lastFiveChapters &&
            lastFiveChapters.map(
              ({ id, imagen, createdAt, estimatedReadTime, title }) => (
                <ChapterCard
                  key={id}
                  id={id}
                  imagen={imagen}
                  createdAt={createdAt}
                  estimatedReadTime={estimatedReadTime}
                  title={title}
                />
              )
            )}
        </section>
      </>
    );
  }
}

export default SingleBook;
