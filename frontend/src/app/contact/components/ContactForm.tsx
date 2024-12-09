"use client";
import React, { useState } from "react";
import { ContactFormProps } from "../interfaces/contact";
import MainButton from "@/components/shared/mainButton";
import { postNewContactMessage } from "../utils/postNewContactMessage";

export const ContactForm = () => {
  const [form, setForm] = useState<ContactFormProps>({
    email: "",
    message: "",
  });
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const maxLength = 500;

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (form.message.trim().length < 10) {
      setError("El mensaje debe tener al menos 10 caracteres.");
      return;
    }
    const newContactMessage = () => {
      try{
        postNewContactMessage({ ...form, setError, setSuccessMessage }).then((result) => {
          setForm({
            email: "",
            message: "",
          })
        })
      }catch(err){
        console.error(err);
      }
    };

    newContactMessage();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <form
        className="flex flex-col relative mb-2.5 w-full"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="email"
          className="text-mainText text-xl md:text-2xl mt-5 "
          aria-label="Correo Electrónico"
        >
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          placeholder="Tu email"
          className="flex-grow px-4 py-2 rounded-lg  mt-4 text-mainText"
          onChange={handleInputChange}
          aria-label="email input"
          required
        />
        <label
          htmlFor="message"
          className="text-mainText text-xl md:text-2xl mt-6 "
          aria-label="Tu mensaje"
        >
          Aquí tu mensaje
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          placeholder="Escribe aquí tu mensaje"
          className="flex-grow px-4 py-2 rounded-lg  mt-4 text-mainText mb-10"
          onChange={handleInputChange}
          maxLength={maxLength}
          rows={5}
        />
        <span className="absolute bottom-20 right-4 text-sm text-gray-500">
          {form.message.length}/{maxLength}
        </span>

        <MainButton name="Enviar" type="submit" />

      </form>
      <div className="flex items-center justify-center w-full min-w-[350px] md:min-w-[450px]">
        {error  && <span className="text-black text-center font-bold bg-red-500 opacity-50 rounded w-full">{error}</span>}
        {successMessage && <span className="text-black text-center font-bold bg-green-500 opacity-50 rounded w-full break-after-auto">{successMessage}</span>}
      </div>
    </div>
  );
};
/* {formData.map(
  ({
    htmlTag,
    labelAriaLabel,
    labelText,
    type,
    id,
    name,
    placeholder,
    inputAriaLabel,
    rows,
    maxLength,
  }) => (
    <div key={name} className="relative">
      <label
        htmlFor={id}
        className="text-mainText text-xl mt-10"
        aria-label={labelAriaLabel}
      >
        {labelText}
      </label>
      {React.createElement(htmlTag, {
        id,
        value: form[name as keyof ContactFormProps] || "",
        placeholder,
        className:
          "flex-grow px-4 py-2 rounded-lg  my-4 text-mainText w-full",
        onChange: handleInputChange,
        "aria-label": inputAriaLabel,
        ...(type && { type }),
        ...(rows && { rows }),
        ...(maxLength && { maxLength }),
      })}
      {name === "message" && (
        <span className="absolute bottom-5 right-4 text-sm text-gray-500">
          {form.message.length}/{maxLength}
        </span>
      )}
    </div>
  )
)} */
