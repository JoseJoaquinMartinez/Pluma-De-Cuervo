"use client";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import ErrorToast from "@/components/shared/ErrorToaster";
import MainButton from "@/components/shared/mainButton";
import { fetchAllChaptersFromABook } from "@/store/slices/singleBook/thunk/fetchAllChaptersFromABook";
import { fetchLastFiveChapters } from "@/store/slices/singleBook/thunk/fetchLastFiveChapters";
import { AppDispatch, RootState } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

interface FormData {
  title: string;
  estimatedReadTime: string;
  bookId: number;
  imagen?: File;
  chapterFile?: File;
  textArea?: string | undefined;
}
const defaultImagen =
  "https://res.cloudinary.com/dpnlm16li/image/upload/v1736969871/dap8vll9qrsgiziwniqo.webp";

export const CreateChapter = ({ bookId }: { bookId: number }) => {
  const { token } = useSelector((state: RootState) => state.Authentication);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    estimatedReadTime: "",
    bookId: bookId,
  });
  const [imagenPreview, setImagenPreview] = useState<string>(defaultImagen);
  const [chapterFile, setChapterFile] = useState<File | null>(null);
  const [chapterText, setChapterText] = useState<string>("");
  const [hideFile, setHideFile] = useState<boolean>(false);
  const [hideTextArea, setHideTextArea] = useState<boolean>(false);
  const handleHideFile = () => {
    setHideFile(!hideFile);
    setHideTextArea(false);
  };
  const handleHideTextArea = () => {
    setHideTextArea(!hideTextArea);
    setHideFile(false);
  };

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
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChapterText(event.target.value);
    setFormData((prev) => ({ ...prev, textArea: event.target.value }));
    setChapterFile(null);
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
    if (!chapterFile && !chapterText) {
      alert("Tienes que subir un archivo o escribir el capítulo");
      return;
    }

    const submitFormData = new FormData();
    submitFormData.append("title", formData.title);
    submitFormData.append("bookId", formData.bookId.toString());
    submitFormData.append("estimatedReadTime", formData.estimatedReadTime);
    if (formData.imagen) submitFormData.append("imagen", formData.imagen);
    if (formData.chapterFile)
      submitFormData.append("file", formData.chapterFile);
    if (formData.textArea) submitFormData.append("textArea", formData.textArea);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/book/upload-chapter`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: submitFormData,
        }
      );

      const data = await response.json();

      if (data) {
        dispatch(fetchLastFiveChapters(bookId));
        dispatch(fetchAllChaptersFromABook(bookId));
        setTimeout(() => {
          setLoading(false);
          router.push(`/libro/${bookId}/capitulos/capitulo/${data.chapterId}`);
        }, 2000);
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
            placeholder="Escribe el título del capítulo"
            value={formData.title}
            onChange={(e) => handleInputChange(e, "title")}
            required
          />
          <p className="text-mainText font-semibold">
            Decide como quieres publicar el capítulo{" "}
            <span
              className="text-encabezados font-bold cursor-pointer"
              onClick={handleHideFile}
            >
              sube un archivo{" "}
            </span>
            o{" "}
            <span
              className="text-encabezados font-bold cursor-pointer"
              onClick={handleHideTextArea}
            >
              escribelo directamente
            </span>
          </p>
          <div className="flex flex-col items-center justify-center mt-2">
            {chapterFile && (
              <p className="text-mainText text-xl my-2">
                El archivo subido es: {chapterFile.name}
              </p>
            )}
            {hideFile && (
              <>
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer  text-white focus:ring-4 font-medium  rounded-lg text-sm md:text-xl px-4 py-2 text-center bg-botones hover:bg-botones/70 focus:ring-botones/20"
                >
                  Carga el capitulo
                </label>

                <input
                  id="fileUpload"
                  type="file"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  onChange={handleChapterFileChange}
                />
              </>
            )}
          </div>

          {hideTextArea && (
            <>
              <label
                htmlFor="textArea"
                className="text-encabezados text-xl my-2"
              >
                Escribe el capítulo aquí abajo
              </label>
              <textarea
                id="textArea"
                name="textArea"
                className=" h-44 border border-encabezados/50 text-mainText md:text-xl  rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-encabezados"
                placeholder="Escribe el capítulo"
                value={formData.textArea}
                onChange={(e) => handleTextChange(e)}
              />
            </>
          )}
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
              Selecciona la portada
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
        <MainButton type="submit" name="Crear Capítulo" />
      </div>
    </form>
  );
};
