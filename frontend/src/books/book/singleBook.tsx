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
import SliderChapters from "../components/SliderChapters";
import { BookStatusBadgeSingleBook } from "../components/BookStatusBadgeSingleBook";
import ErrorToast from "@/components/shared/ErrorToaster";

function SingleBook({ bookId }: { bookId: number }) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: book,
    loading,
    error,
  } = useSelector((state: RootState) => state.singleBook);
  const { data } = useSelector((state: RootState) => state.Authentication);
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
    return (
      <div className="felx flex-col items-center justify-center w-full">
        <BookLoaderComponent />
      </div>
    );
  }
  if (error) {
    return <ErrorToast message={error} />;
  }

  if (book) {
    return (
      <section className="flex flex-col items-center mt-5 lg:max-w-screen-xl ">
        <div className="flex flex-col md:flex-row self-start">
          <h2
            className={
              "text-encabezados text-2xl  text-start mb-2 self-start px-2"
            }
          >
            {book.title}
          </h2>
          <BookStatusBadgeSingleBook status={book.status} />
        </div>

        <section
          className={"flex flex-col lg:flex-row justify-start gap-6 mb-2 px-2"}
        >
          <div className={"flex flex-col w-auto lg:w-[900px]"}>
            <p
              className={
                "bg-cardsBackground text-mainText rounded-lg p-2 whitespace-pre-wrap"
              }
            >
              {book.Synopsis}
            </p>
          </div>
          <article className="flex flex-col items-center justify-center">
            <div className=" relative flex flex-col items-center transition duration-500 ease-in-out transform shadow-xl overflow-clip rounded-xl sm:rounded-xl mlg:group-hover:-translate-y-1 mlg:group-hover:shadow-2xl">
              <Image
                src={book.imagen}
                alt={book.title}
                width={500}
                height={500}
                className="h-full object-cover object-top mlg:scale-110 rounded-lg transition duration-500 hover:scale-100"
              />
            </div>
            {data?.user.role === "admin" && (
              <section className="flex flex-col md:flex-row gap-2 items-center my-2">
                <div className="">
                  <MainButton
                    name="Crear Capítulo"
                    link={`/admin/libros/libro/${bookId}/capitulo/crear`}
                  />
                </div>
                <div className="">
                  <MainButton
                    name="Editar Libro"
                    link={`/admin/libros/libro/${bookId}/editar`}
                  />
                </div>
              </section>
            )}
          </article>
        </section>
        <section className="flex flex-col">
          <h3
            className={
              "text-encabezados text-2xl  text-start mb-2 self-start px-2"
            }
          >
            Últimos Capítulos
          </h3>
          {lastFiveChapters && lastFiveChapters.length === 0 && (
            <section className="flex flex-col items-center justify-center text-mainText text-2xl">
              <p>Este libro aún no tiene capítulos</p>
              <p>
                Pronto llegará una nueva{" "}
                <span className="text-encabezados">historia</span>
              </p>
            </section>
          )}
          <article className="gap-2 hidden md:grid md:grid-cols-3 lg:grid-cols-5 ">
            {lastFiveChaptersLoading && (
              <div className="felx flex-col items-center justify-center w-full">
                <BookLoaderComponent />
              </div>
            )}
            {lastFiveChaptersError && (
              <ErrorToast message={lastFiveChaptersError} />
            )}
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
                    bookId={bookId}
                  />
                )
              )}
          </article>
          <article className="flex flex-col w-96 md:hidden px-2">
            {lastFiveChaptersLoading && <BookLoaderComponent />}
            {lastFiveChaptersError && <p>{lastFiveChaptersError}</p>}
            {lastFiveChapters && <SliderChapters chapters={lastFiveChapters} />}
          </article>
          <article className="self-center mt-4">
            <MainButton
              link={`/libro/${bookId}/capitulos`}
              name="Más Capítulos"
            />
          </article>
        </section>
      </section>
    );
  }
}

export default SingleBook;
