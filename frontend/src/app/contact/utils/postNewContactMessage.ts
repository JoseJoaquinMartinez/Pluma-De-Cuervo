import { ContactFormProps } from "../interfaces/contact";
import React from "react";

interface SentMessageProps extends ContactFormProps {
  setError: React.Dispatch<React.SetStateAction<string>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const postNewContactMessage = async ({
  email,
  message,
  setError,
  setSuccessMessage,
}: SentMessageProps): Promise<void> => {
  try {

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact/post-new-contact-message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData?.message || "Error enviando el mensaje");
      setTimeout(() =>{
        setError("")
      }, 2000)
      return;
    }

    const data = await response.json();
    setSuccessMessage(data?.message || "Mensaje enviado correctamente");
    setTimeout(() =>{
      setSuccessMessage("")
    }, 2000)
  } catch (error) {
    setError(
      error instanceof Error
        ? error.message
        : "Ocurrió un error inesperado. Intenta de nuevo."
    );
  }
};
