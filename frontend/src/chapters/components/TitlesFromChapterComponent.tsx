"use client";
import { NewUserInterface } from "@/app/authComponents/interfaces/singupInterface";
import ErrorToast from "@/components/shared/ErrorToaster";
import { ImageComponent } from "@/components/shared/ImageComponent";
import MainButton from "@/components/shared/mainButton";
import { RootState } from "@/store/store";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
interface Props {
  bookTitle: string;
  imagen: string;
  title: string;
  createdAt: string;
  data?: NewUserInterface;
  isLoggedIn?: boolean;
  bookId: number;
  chapterId: number;
}

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
        ¿Estás seguro de que deseas eliminar este capítulo?
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

export const TitlesFromChapterComponent = ({
  bookTitle,
  imagen,
  title,
  createdAt,
  isLoggedIn,
  data,
  bookId,
  chapterId,
}: Props) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.Authentication);

  const onDelete = async (chapterId: number) => {
    if (token) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/book/delete-chapter/${chapterId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        router.push(`/libro/${bookId}`);
      } catch (error) {
        if (error instanceof Error) {
          <ErrorToast message={error.message} />;
        } else {
          <ErrorToast message="Error desconocido" />;
        }
      }
    }
  };
  return (
    <article className="flex flex-col w-full px-4 max-w-screen-xl">
      <section className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-between w-full px-2 mt-4">
          <h2 className="text-encabezados text-2xl  text-start mb-4 self-start ">
            {bookTitle}
          </h2>
          {isLoggedIn && data?.user.role === "admin" ? (
            <div className="flex flex-col md:flex-row gap-2">
              <MainButton
                name="Editar capítulo"
                link={`/admin/libros/libro/${bookId}/capitulo/${chapterId}/editar`}
              />
              <MainButton
                name="Eliminar"
                onClick={() => {
                  setOpenDeleteModal(true);
                }}
              />
              <MainButton
                name="Crear capítulo"
                link={`/admin/libros/libro/${bookId}/capitulo/crear`}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div>
          <ImageComponent imagen={imagen} title={title} />
        </div>
      </section>
      <section className="flex flex-col items-center">
        <h3 className="text-encabezados text-2xl mb-4 px-2 mt-4">{title}</h3>
        <p className="text-mainText/50 text-sm">GPS</p>
        <span className="text-mainText/50 text-sm">{createdAt}</span>
      </section>
      {openDeleteModal && (
        <DeleteModal
          onConfirm={() => {
            onDelete(chapterId);
            setOpenDeleteModal(false);
          }}
          onCancel={() => setOpenDeleteModal(false)}
        />
      )}
    </article>
  );
};
