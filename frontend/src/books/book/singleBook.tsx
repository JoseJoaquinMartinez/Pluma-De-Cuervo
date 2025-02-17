"use client";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";

const DeleteModal = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-cardsBackground p-4 rounded-lg shadow-lg">
      <p className="text-mainText">
        ¿Estás seguro de que deseas eliminar este libro?
      </p>
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="bg-encabezados hover:bg-encabezados/90 text-white px-4 py-2 rounded"
          onClick={onConfirm}
        >
          Sí
        </button>
        <button
          className="bg-botones hover:bg-botones/90 px-4 py-2 rounded"
          onClick={onCancel}
        >
          No
        </button>
      </div>
    </div>
  </div>
);

function SingleBook({ bookId }: { bookId: number }) {
  const dispatch = useDispatch<AppDispatch>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const router = useRouter();
  const {
    data: book,
    loading,
    error,
  } = useSelector((state: RootState) => state.singleBook);
  const { data, token } = useSelector(
    (state: RootState) => state.Authentication
  );
  const {
    data: lastFiveChapters,
    loading: lastFiveChaptersLoading,
    error: lastFiveChaptersError,
  } = useSelector((state: RootState) => state.lastFiveChapters);

  const onDelete = async (bookId: number) => {
    if (token) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/book//delete-book/${bookId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          router.push("/admin/libros");
        } else {
          throw new Error("No se pudo eliminar el libro");
        }
      } catch (error) {
        if (error instanceof Error) {
          <ErrorToast message={error.message} />;
        } else {
          <ErrorToast message="Error desconocido" />;
        }
      }
    }
  };

  useEffect(() => {
    if (!book || book.id !== bookId) {
      dispatch(fetchSingleBookData(bookId));
      dispatch(fetchLastFiveChapters(bookId));
    }
  }, [bookId, book, dispatch]);

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
                <div className="flex flex-col md:flex-row gap-2">
                  <MainButton
                    name="Editar Libro"
                    link={`/admin/libros/libro/${bookId}/editar`}
                  />
                  <MainButton
                    name="Eliminar Libro"
                    onClick={() => {
                      setOpenDeleteModal(true);
                    }}
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
              <div className="flex flex-col items-center justify-center w-full">
                <BookLoaderComponent />
              </div>
            )}
            {lastFiveChaptersError && (
              <ErrorToast message={lastFiveChaptersError} />
            )}
            {lastFiveChapters &&
              lastFiveChapters.map(({ id, imagen, createdAt, title }) => (
                <ChapterCard
                  key={id}
                  id={id}
                  imagen={imagen}
                  createdAt={createdAt}
                  title={title}
                  bookId={bookId}
                />
              ))}
          </article>
          <article className="flex flex-col w-96 md:hidden px-2">
            {lastFiveChaptersLoading && <BookLoaderComponent />}
            {lastFiveChaptersError && <p>{lastFiveChaptersError}</p>}
            {lastFiveChapters && (
              <SliderChapters chapters={lastFiveChapters} bookId={bookId} />
            )}
          </article>
          <article className="self-center mt-4">
            <MainButton
              link={`/libro/${bookId}/capitulos`}
              name="Más Capítulos"
            />
          </article>
        </section>
        {openDeleteModal && (
          <DeleteModal
            onConfirm={() => {
              onDelete(bookId);
              setOpenDeleteModal(false);
            }}
            onCancel={() => setOpenDeleteModal(false)}
          />
        )}
      </section>
    );
  }
}

export default SingleBook;
