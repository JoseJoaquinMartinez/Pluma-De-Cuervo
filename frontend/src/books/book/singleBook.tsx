"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import { fetchSingleBookData } from "@/store/slices/singleBook/thunk/fetchSingleBookData";
import { fetchLastFiveChapters } from "@/store/slices/singleBook/thunk/fetchLastFiveChapters";
import ChapterCard from "@/app/(un-auth-regular-user)/ultimos-capitulos/components/ChapterCard";
import Image from "next/image";
import MainButton from "@/components/shared/mainButton";
import SliderChapters from '../components/SliderChapters';

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
      <section className="felx flex-col items-center mt-5 lg:max-w-screen-xl">
            <h2 className={"text-encabezados text-2xl  text-start mb-2 self-start"}>
              {book.title}
            </h2>
        <section
          className={
            "flex flex-col lg:flex-row justify-start gap-6 mb-2"
          }
        >
          <div className={"flex flex-col w-auto lg:w-[900px]"}>
            
            <p className={"bg-cardsBackground text-mainText rounded-lg p-2"}>
              {book.Synopsis}
            </p>
          </div>
          <div className=" relative flex flex-col items-center transition duration-500 ease-in-out transform shadow-xl overflow-clip rounded-xl sm:rounded-xl mlg:group-hover:-translate-y-1 mlg:group-hover:shadow-2xl">
            <Image
              src={book.imagen}
              alt={book.title}
              width={500}
              height={500}
              className="h-full object-cover object-top mlg:scale-110 rounded-lg transition duration-500 hover:scale-100"
            />
          </div>
        </section>
        <section className="flex flex-col">
          <h3 className={"text-encabezados text-2xl  text-start mb-2 self-start"}>Últimos Capítulos</h3>
          <article className="gap-2 hidden md:flex">
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
          </article>
          <article className="flex flex-col md:hidden">
          {lastFiveChaptersLoading && <BookLoaderComponent />}
          {lastFiveChaptersError && <p>{lastFiveChaptersError}</p>}
            {
              lastFiveChapters && <SliderChapters chapters={lastFiveChapters}/>
            }
          </article>
          <article className="self-center mt-2">
            <MainButton  link={`/libro/${bookId}/capitulos`} name="Más Capítulos"/>
          </article>
        </section>
      </section>
    );
  }
}

export default SingleBook;
