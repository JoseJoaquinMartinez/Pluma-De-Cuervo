"use client";
import { RootState } from "@/store/store";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getSingleBook } from "./utils/getSingleBook";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import MainButton from "@/components/shared/mainButton";
import Image from "next/image";
import ErrorToast from "@/components/shared/ErrorToaster";

interface GetSingleBook {
  id: number;
  title: string;
  imagen: string | File;
  Synopsis: string;
  status: string;
}

const statusOptions = ["ACTIVO", "DISCONTINUADO", "COMPLETADO"];

export const EditBook = ({ bookId }: { bookId: number }) => {
  const [formData, setFormData] = useState<GetSingleBook>({
    id: bookId,
    title: "",
    imagen: "",
    Synopsis: "",
    status: "",
  });
  const { token } = useSelector((state: RootState) => state.Authentication);
  const [loading, setLoading] = useState<boolean>(false);
  const [imagenPreview, setImagenPreview] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const data = await getSingleBook(bookId);
        setFormData(data);
        if (typeof data.imagen === "string") {
          setImagenPreview(data.imagen);
        }
      } catch (error) {
        <ErrorToast
          message={
            error instanceof Error
              ? error.message
              : "Error al enviar el formulario:"
          }
        />;
      }
    };
    fetchBookData();
  }, [bookId]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imagen: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setImagenPreview(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const submitFormData = new FormData();

    submitFormData.append("title", formData.title);
    submitFormData.append("Synopsis", formData.Synopsis);
    submitFormData.append("status", formData.status);
    if (formData.imagen) {
      submitFormData.append("imagen", formData.imagen);
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/book/put-existing-book/${bookId}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: submitFormData,
        }
      );
      const data = await response.json();
      setLoading(false);
      if (data) {
        router.push(`/libro/${data.updatedBook.id}`);
      }
    } catch (error) {
      <ErrorToast
        message={
          error instanceof Error
            ? error.message
            : "Error al enviar el formulario:"
        }
      />;
    }
  };
  if (loading) {
    return (
      <div className="felx flex-col items-center justify-center">
        <BookLoaderComponent />
      </div>
    );
  }

  return (
    <form
      className="flex flex-col w-full md:w-[670px] mlg:w-[1080px]"
      onSubmit={handleSubmit}
    >
      <article
        className="flex flex-col md:flex-row justify-between
        "
      >
        <div className="flex flex-col md:w-1/2">
          <label htmlFor="status" className="text-encabezados md:text-xl my-2">
            Estado del libro
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="border border-encabezados/50 text-mainText rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-encabezados"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0) + option.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          <label htmlFor="title" className="text-encabezados md:text-xl my-2">
            Título
          </label>
          <input
            id="title"
            name="title"
            className="border border-encabezados/50 text-mainText md:text-xl  rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-encabezados"
            placeholder="Escribe el título del libro"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="Synopsis" className="text-encabezados text-xl my-2">
            Escribe la Sinopsis del libro
          </label>
          <textarea
            id="Synopsis"
            name="Synopsis"
            className=" h-44 border border-encabezados/50 text-mainText md:text-xl  rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-encabezados"
            placeholder="Va currate la sinopsis rey"
            value={formData.Synopsis}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="">
          <label className="text-encabezados md:text-xl">
            Imagen (opcional)
          </label>
          <Image
            src={imagenPreview}
            width={300}
            height={300}
            alt="Imagen de la portada del libro"
            className="rounded-xl my-3 aspect-auto"
          />
          <div className="flex flex-col md:flex-row justify-center items-center ">
            <label
              htmlFor="fileUpload"
              className="cursor-pointer  text-white focus:ring-4 font-medium  rounded-lg text-sm md:text-xl px-4 py-2 text-center bg-botones hover:bg-botones/70 focus:ring-botones/20"
            >
              Selecciona la portada
            </label>
            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>
      </article>

      <div className="mt-3 self-center">
        <MainButton type="submit" name="Actualizar Libro" />
      </div>
    </form>
  );
};
