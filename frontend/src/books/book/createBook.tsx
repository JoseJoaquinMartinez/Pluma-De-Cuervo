"use client";
import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  title: string;
  synopsis: string;
  image?: File;
}
export const CreateBook = () => {
  const defaultImage =
    "https://res.cloudinary.com/dpnlm16li/image/upload/v1736969871/dap8vll9qrsgiziwniqo.webp";

  const [imagePreview, setImagePreview] = useState<string>(defaultImage);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    synopsis: "",
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setImagePreview(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitFormData = new FormData();
    submitFormData.append("title", formData.title);
    submitFormData.append("synopsis", formData.synopsis);

    if (formData.image) {
      submitFormData.append("image", formData.image);
    }

    try {
      // const response = await fetch('tu-url-api/books', {
      //   method: 'POST',
      //   body: submitFormData,
      // });
      // const data = await response.json();
    } catch (error) {
      console.error(
        "Error al enviar el formulario:",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="block font-medium">
            Título *
          </label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Imagen (opcional)</label>
          <div className="relative w-full aspect-square">
            <Image
              src={imagePreview}
              fill
              className="object-cover rounded"
              alt="Previsualización del libro"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="synopsis" className="block font-medium">
            Synopsis *
          </label>
          <textarea
            id="synopsis"
            name="synopsis"
            value={formData.synopsis}
            onChange={handleInputChange}
            className="w-full p-2 border rounded min-h-[150px]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Crear Libro
        </button>
      </form>
    </section>
  );
};
