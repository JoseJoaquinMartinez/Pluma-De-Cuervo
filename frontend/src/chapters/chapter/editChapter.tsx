"use client";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import MainButton from "@/components/shared/mainButton";
import { RootState } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useSelector } from "react-redux";

interface FormData {
  title: string;
  estimatedReadTime: string;
  bookId: number;
  imagen: File | string;
  chapterFile?: File;
  textArea?: string | undefined;
}

const defaultImagen =
  "https://res.cloudinary.com/dpnlm16li/image/upload/v1736969871/dap8vll9qrsgiziwniqo.webp";

export const EditChapter = ({
  bookId,
  chapterId,
}: {
  bookId: number;
  chapterId: number;
}) => {
  const { token } = useSelector((state: RootState) => state.Authentication);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    estimatedReadTime: "",
    bookId: bookId,
    imagen: "",
  });
  const [imagenPreview, setImagenPreview] = useState<string>(defaultImagen);
  const [chapterFile, setChapterFile] = useState<File | null>(null);
  const [showTextArea, setShowTextArea] = useState<boolean>(true);

  useEffect(() => {
    const getChapterInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/book/get-chapter/${bookId}/${chapterId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos del capítulo");
        }
        const data = await response.json();

        setFormData({
          title: data.title || "",
          estimatedReadTime: data.estimatedReadTime.split(" ")[0],
          bookId: bookId,
          imagen: data.imagen || defaultImagen,
        });

        setImagenPreview(data.imagen || defaultImagen);
      } catch (error) {
        console.error("Error al obtener el capítulo:", error);
      }
    };

    getChapterInfo();
  }, [bookId, chapterId]);

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
  const handleChapterFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, chapterFile: file }));
      setChapterFile(file);
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
  const handleRemoveFile = () => {
    setChapterFile(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.chapterFile && !formData.textArea) {
      alert("Tienes que subir un archivo o escribir el capítulo");
      setLoading(false);
      return;
    }

    const submitFormData = new FormData();
    submitFormData.append("title", formData.title);
    submitFormData.append("estimatedReadTime", formData.estimatedReadTime);
    submitFormData.append("bookId", formData.bookId.toString());

    submitFormData.append("imagen", formData.imagen);

    if (formData.chapterFile)
      submitFormData.append("file", formData.chapterFile);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/book/modify-chapter/${chapterId}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: submitFormData,
        }
      );

      const data = await response.json();

      if (data) {
        setTimeout(() => {
          setLoading(false);
          router.push(`/libro/${bookId}/capitulos/capitulo/${chapterId}`);
        }, 2000);
      }
    } catch (error) {
      console.error(
        "Error al enviar el formulario:",
        error instanceof Error ? error.message : "Error desconocido"
      );
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
          <label htmlFor="title" className="text-encabezados md:text-xl my-2">
            Título
          </label>
          <input
            id="title"
            name="title"
            className="border border-encabezados/50 text-mainText md:text-xl  rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-encabezados"
            placeholder="Escribe el título del capítulo"
            value={formData.title}
            onChange={(e) => handleInputChange(e, "title")}
            required
          />

          <div className="flex flex-col items-center justify-center mt-2">
            {chapterFile ? (
              <div className="flex flex-col items-center gap-2">
                <p className="text-mainText text-xl my-2">
                  El archivo subido es: {chapterFile.name}
                </p>
                <MainButton name="Quitar archivo" onClick={handleRemoveFile} />
              </div>
            ) : (
              <>
                <p className=" text-mainText text-xl my-2">
                  Si quieres modificar algo del capítulo sube el archivo
                </p>
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer  text-white focus:ring-4 font-medium  rounded-lg text-sm md:text-xl px-4 py-2 text-center bg-botones hover:bg-botones/70 focus:ring-botones/20"
                >
                  Carga el capitulo
                </label>
              </>
            )}

            <input
              id="fileUpload"
              type="file"
              accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={handleChapterFileChange}
            />
          </div>
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
              htmlFor="fileImagenUpload"
              className="cursor-pointer  text-white focus:ring-4 font-medium  rounded-lg text-sm md:text-xl px-4 py-2 text-center bg-botones hover:bg-botones/70 focus:ring-botones/20"
            >
              Modifica la portada
            </label>
            <input
              id="fileImagenUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>
      </article>

      <div className="mt-3 self-center">
        <MainButton type="submit" name="Editar Capítulo" />
      </div>
    </form>
  );
};
