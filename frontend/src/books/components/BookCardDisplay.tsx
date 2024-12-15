import Image from "next/image";
import MainButton from "@/components/shared/mainButton";
import React from "react";
import { BookCardComponentProps } from "../interfaces/bookData";

const BookCard = ({ id, title, Synopsis, imagen }: BookCardComponentProps) => {
  return (
    <article className="w-full flex flex-col items-center justify-center pb-6 rounded-xl bg-cardsBackground">
      <div
        className={`relative flex flex-col items-center transition duration-500 ease-in-out transform shadow-xl overflow-clip rounded-xl max-h-40`}
      >
        <Image
          src={imagen}
          alt={title}
          width={500}
          height={500}
          className={`object-cover object-top scale-110 rounded-lg transition duration-500 hover:scale-100 `}
        />
      </div>

      <h2 className="my-2 text-encabezados text-lg sm:text-xl md:text-2xl">
        {title}
      </h2>
      <p className="text-mainText text-pretty mb-2 line-clamp-3 px-1">
        {Synopsis}
      </p>
      <MainButton link={`/libro/${id}`} name="Leer" />
    </article>
  );
};

export default BookCard;
