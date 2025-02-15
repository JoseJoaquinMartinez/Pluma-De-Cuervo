"use client";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import ErrorToast from "@/components/shared/ErrorToaster";
import MainButton from "@/components/shared/mainButton";
import { fetchLibraryBooks } from "@/store/slices/library/thunks/fecthLibraryBooks";
import { AppDispatch, RootState } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

interface FormData {
  title: string;
  synopsis: string;
  imagen?: File;
}
const defaultImagen =
  "https://res.cloudinary.com/dk9juz4fp/image/upload/v1739611427/Pluma%20de%20Cuervo/igvlg1cr6ntol97a2ct5.jpg";
export const CreateBook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.Authentication);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    synopsis: "",
  });
  const [imagenPreview, setImagenPreview] = useState<string>(defaultImagen);

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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const submitFormData = new FormData();
    submitFormData.append("title", formData.title);
    submitFormData.append("Synopsis", formData.synopsis);
    if (formData.imagen) {
      submitFormData.append("imagen", formData.imagen);
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/book/new-book`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: submitFormData,
        }
      );
      const data = await response.json();
      setLoading(false);
      if (data) {
        dispatch(fetchLibraryBooks());
        router.push(`/libro/${data.newBook.id}`);
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
      <div className="flex flex-col items-center justify-center w-full">
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
          <label htmlFor="synopsis" className="text-encabezados text-xl my-2">
            Escribe la Sinopsis del libro
          </label>
          <textarea
            id="synopsis"
            name="synopsis"
            className=" h-44 border border-encabezados/50 text-mainText md:text-xl  rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-encabezados"
            placeholder="Va currate la sinopsis rey"
            value={formData.synopsis}
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
        <MainButton type="submit" name="Crear Libro" />
      </div>
    </form>
  );
};
