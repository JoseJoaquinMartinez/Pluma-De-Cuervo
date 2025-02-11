"use client";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import ErrorToast from "@/components/shared/ErrorToaster";
import MainButton from "@/components/shared/mainButton";
import { RootState } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useSelector } from "react-redux";

interface FormData {
  title: string;
  blogText: string;
  estimatedReadTime: string;
  imagen?: File;
}
const defaultImagen =
  "https://res.cloudinary.com/dpnlm16li/image/upload/v1736969871/dap8vll9qrsgiziwniqo.webp";

export const CreateBlog = () => {
  const { token } = useSelector((state: RootState) => state.Authentication);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    blogText: "",
    estimatedReadTime: "",
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [field]: field === "estimatedReadTime" ? `${value} min` : value,
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const submitFormData = new FormData();
    submitFormData.append("title", formData.title);
    submitFormData.append("blogText", formData.blogText);
    submitFormData.append("estimatedReadTime", formData.estimatedReadTime);
    if (formData.imagen) {
      submitFormData.append("imagen", formData.imagen);
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/post-new-blog`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: submitFormData,
        }
      );
      const data = await response.json();
      setLoading(false);
      if (data) {
        router.push(`/blogs/all-blogs/blog/${data.newBlogPost.id}`);
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
      <div className="felx flex-col items-center justify-center w-full">
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
            onChange={(e) => handleInputChange(e, "title")}
            required
          />

          <label htmlFor="blogText" className="text-encabezados text-xl my-2">
            Deja aquí tus pensamientos
          </label>
          <textarea
            id="blogText"
            name="blogText"
            className=" h-44 border border-encabezados/50 text-mainText md:text-xl  rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-encabezados"
            placeholder="Escribe tus pensamientos"
            value={formData.blogText}
            onChange={(e) => handleInputChange(e, "blogText")}
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="estimatedReadTime"
            className="text-encabezados md:text-xl my-2"
          >
            Tiempo estimado de lectura
          </label>
          <input
            type="number"
            id="estimatedReadTime"
            name="estimatedReadTime"
            className="border border-encabezados/50 text-mainText md:text-xl rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-encabezados"
            placeholder="Tiempo estimado de lectura"
            value={formData.estimatedReadTime.replace(" min", "")}
            onChange={(e) => handleInputChange(e, "estimatedReadTime")}
            required
          />
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
        <MainButton type="submit" name="Crear Entrada de Blog" />
      </div>
    </form>
  );
};
