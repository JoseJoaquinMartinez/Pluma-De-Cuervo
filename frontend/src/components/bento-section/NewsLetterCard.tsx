import React from "react";
import MainButton from "../shared/mainButton";

export const NewsLetterCard: React.FC = () => {
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
      <form className="flex mt-4 w-full max-w-md flex-col">
        <input
          type="email"
          placeholder="Deja tu Email"
          className="flex-grow px-4 py-2 rounded-lg  mb-2"
          aria-label="email"
        />
        <MainButton name="!Únete¡" />
      </form>
    </article>
  );
};
