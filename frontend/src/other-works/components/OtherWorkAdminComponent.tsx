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
  workText: string;
  imagen?: File;
  buttons: {
    text: string;
    link: string;
  }[];
}

const defaultImagen =
  "https://res.cloudinary.com/dk9juz4fp/image/upload/v1739611427/Pluma%20de%20Cuervo/igvlg1cr6ntol97a2ct5.jpg";

export const OtherWorkAdminComponent = () => {
  const { token } = useSelector((state: RootState) => state.Authentication);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    workText: "",
    imagen: undefined,
    buttons: [
      { text: "", link: "" }, // botón inicial
    ],
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
    field: keyof FormData
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleButtonChange = (
    index: number,
    field: "text" | "link",
    value: string
  ) => {
    const updatedButtons = [...formData.buttons];
    updatedButtons[index][field] = value;
    setFormData({ ...formData, buttons: updatedButtons });
  };

  const addButton = () => {
    setFormData((prev) => ({
      ...prev,
      buttons: [...prev.buttons, { text: "", link: "" }],
    }));
  };

  const removeButton = (index: number) => {
    const updatedButtons = formData.buttons.filter((_, i) => i !== index);
    setFormData({ ...formData, buttons: updatedButtons });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const submitFormData = new FormData();
    submitFormData.append("title", formData.title);
    submitFormData.append("workText", formData.workText);
    submitFormData.append("buttons", JSON.stringify(formData.buttons));
    if (formData.imagen) {
      submitFormData.append("imagen", formData.imagen);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/other-works/post-other-work`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: submitFormData,
        }
      );

      const data = await response.json();

      if (data) {
        setTimeout(() => {
          setLoading(false);
          router.push(`/admin/otros-trabajos`);
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
      <article className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col md:w-1/2">
          <label htmlFor="title" className="text-encabezados md:text-xl my-2">
            Título
          </label>
          <input
            id="title"
            name="title"
            className="border border-encabezados/50 text-mainText md:text-xl rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-encabezados"
            placeholder="Escribe el título"
            value={formData.title}
            onChange={(e) => handleInputChange(e, "title")}
            required
          />

          <label
            htmlFor="workText"
            className="text-encabezados text-xl my-2 mt-4"
          >
            Escribe el cuerpo de la obra
          </label>
          <textarea
            id="workText"
            name="workText"
            className="h-44 border border-encabezados/50 text-mainText md:text-xl rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-encabezados"
            placeholder="Escribe el contenido"
            value={formData.workText}
            onChange={(e) => handleInputChange(e, "workText")}
            required
          />

          <div className="flex flex-col mt-4">
            <label className="text-encabezados text-xl my-2">
              Botones de la obra
            </label>
            {formData.buttons.map((button, index) => (
              <div
                key={index}
                className="flex flex-col border border-red-700 bg-cardsBackground p-2 mb-2 rounded-md"
              >
                <label className="text-sm text-encabezados">
                  Texto del botón
                </label>
                <input
                  type="text"
                  value={button.text}
                  placeholder="Ej: Ver más"
                  onChange={(e) =>
                    handleButtonChange(index, "text", e.target.value)
                  }
                  className="mb-2 border border-encabezados/50 rounded-md px-3 py-2 text-mainText"
                  required
                />
                <label className="text-sm text-encabezados">
                  Link del botón
                </label>
                <input
                  type="text"
                  value={button.link}
                  placeholder="https://..."
                  onChange={(e) =>
                    handleButtonChange(index, "link", e.target.value)
                  }
                  className="mb-2 border border-encabezados/50 rounded-md px-3 py-2 text-mainText"
                  required
                />
                {formData.buttons.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeButton(index)}
                    className="text-red-700 text-sm self-end mt-1 hover:underline"
                  >
                    Eliminar botón
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addButton}
              className="text-mainText text-sm mt-2  bg-cardsBackground rounded-md px-3 py-2 self-start md:self-center md:w-fit hover:bg-cardsBackground/70 transition-colors duration-300 "
            >
              + Añadir otro botón
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-encabezados md:text-xl mt-2">
            Imagen (opcional)
          </label>
          <Image
            src={imagenPreview}
            width={300}
            height={300}
            alt="Imagen de la portada del trabajo"
            className="rounded-xl my-3 aspect-auto"
          />
          <div className="flex flex-col md:flex-row justify-center items-center">
            <label
              htmlFor="fileImagenUpload"
              className="cursor-pointer text-white focus:ring-4 font-medium rounded-lg text-sm md:text-xl px-4 py-2 text-center bg-botones hover:bg-botones/70 focus:ring-botones/20"
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
        <MainButton type="submit" name="Crear Trabajo" />
      </div>
    </form>
  );
};
