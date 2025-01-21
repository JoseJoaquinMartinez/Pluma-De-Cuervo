"use client";
import MainButton from "@/components/shared/mainButton";
import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  title: string;
  synopsis: string;
  imagen?: File;
}
export const CreateBook = () => {
  const defaultImagen =
    "https://res.cloudinary.com/dpnlm16li/image/upload/v1736969871/dap8vll9qrsgiziwniqo.webp";
  const [formData, setFormData] = useState<FormData>({
    title: "",
    synopsis: "",
  });
  const [imagenPreview, setImagenPreview] = useState<string>(defaultImagen);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {};

  return (
    <form className="flex flex-col w-full md:w-[670px] mlg:w-[1080px]">
      <article
        className="flex flex-col md:flex-row justify-between
      "
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="text-encabezados md:text-xl my-2">
            Título
          </label>
          <input
            id="title"
            name="title"
            className="border border-encabezados/50 text-mainText md:text-xl  rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-encabezados"
            placeholder="Escribe el título del libro"
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
          <div>
            <label
              htmlFor="fileUpload"
              className="cursor-pointer text-white focus:ring-4 font-medium  rounded-lg text-sm md:text-xl px-4 py-2 text-center bg-botones hover:bg-botones/70 focus:ring-botones/20"
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

      <article className="flex flex-col w-full">
        <label htmlFor="synopsis" className="text-encabezados text-xl my-2">
          Escribe la Sinopsis del libro
        </label>
        <input
          id="synopsis"
          name="synopsis"
          className="border border-encabezados/50 text-mainText md:text-xl  rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-encabezados"
          placeholder="Va currate la sinopsis rey"
          required
        />
      </article>
      <div className="mt-3 self-center">
        <MainButton type="submit" name="Crear Libro" />
      </div>
    </form>
  );
};
