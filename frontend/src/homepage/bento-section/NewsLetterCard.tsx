"use client";
import ErrorToast from "@/components/shared/ErrorToaster";
import MainButton from "@/components/shared/mainButton";
import SuccessToast from "@/components/shared/SuccessToast";
import { useState } from "react";

export const NewsLetterCard: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [succesMessage, setSuccesMessage] = useState("");

  const addNewSubscriberToTheList = (email: string) => {
    fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/newsletter/post-new-subscriber",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            setError(
              errorData.message || " Error al añadir al usuario a la Newsletter"
            );
            return;
          });
        } else if (res.ok) {
          return res.json().then((succesData) => {
            setSuccesMessage(succesData.message);
            setTimeout(() => {
              setSuccesMessage("");
            }, 2000);
          });
        }
      })
      .catch((error) => {
        setError(error.message || "Error de red. Inténtelo nuevamente");
        return;
      });
  };

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email.length === 0) {
      setError("Introduzca un email válido");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    addNewSubscriberToTheList(email);
    setSuccesMessage("");
    setEmail("");
  };

  return (
    <article className="bg-cardsBackground p-3 rounded-lg mb-6 flex flex-col md:flex-row items-center justify-between">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-encabezados">
          Deja tu correo para una futura Newsletter
        </h2>
        <p className="mt-2 text-sm  text-mainText">
          (Sólo si quieres recibir algún correo puntual, no estoy yo para
          ponerme a spammear a nadie)
        </p>
      </div>
      <form
        className="flex mt-4 w-full max-w-md flex-col"
        onSubmit={handleSumbit}
      >
        <input
          type="email"
          placeholder="Deja tu Email"
          className="flex-grow px-4 py-2 rounded-lg  mb-2 text-mainText"
          onChange={(e) => setEmail(e.target.value)}
          aria-label="email"
          required
        />

        {error && <ErrorToast message={error} />}
        {succesMessage && (
          <SuccessToast message={succesMessage} duration={2000} />
        )}
        <MainButton name="¡Únete!" type="submit" />
      </form>
    </article>
  );
};
