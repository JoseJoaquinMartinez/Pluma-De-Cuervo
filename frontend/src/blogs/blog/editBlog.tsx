"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { getSingleBlog } from "@/blogs/utils/getSingleBlog";
import { SingleBlog } from "../interface/blogs";
import MainButton from "@/components/shared/mainButton";
import Image from "next/image";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ErrorToast from "@/components/shared/ErrorToaster";

export const EditExistingBlog = ({ blogId }: { blogId: number }) => {
  const [formData, setFormData] = useState<SingleBlog>({
    id: blogId,
    title: "",
    blogText: "",
    estimatedReadTime: "",
    createdAt: "",
    imagen: "",
  });
  const { token } = useSelector((state: RootState) => state.Authentication);
  const [loading, setLoading] = useState<boolean>(false);
  const [imagenPreview, setImagenPreview] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const data = await getSingleBlog(blogId);
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

    fetchBlogData();
  }, [blogId]);

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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [field]: field === "estimatedReadTime" ? `${value} min` : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/put-existing-blog/${blogId}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: submitFormData,
        }
      );
      const data = await response.json();
      setTimeout(() => {
        setLoading(false);
        if (data) {
          router.push(`/blogs/all-blogs/blog/${data.updatedBlog.id}`);
        }
      }, 2000);
    } catch (error) {
      <ErrorToast
        message={error instanceof Error ? error.message : "Error desconocido"}
      />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
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
        <MainButton type="submit" name="Actualiza la Entrada de Blog" />
      </div>
    </form>
  );
};
