import MainButton from "@/components/shared/mainButton";
import React from "react";
import Image from "next/image";
import { BookCardComponentProps } from "../interfaces/bookData";
import { BookStatusBadgeLibrary } from "./BookStatusBadgeLibrary";

const BookCard = ({
  id,
  title,
  Synopsis,
  imagen,
  status,
}: BookCardComponentProps) => {
  return (
    <article className="flex flex-col items-center justify-center w-full max-w-[400px] md:max-w-full">
      <div className="mb-4 w-full h-64 relative">
        <Image
          src={imagen}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col items-center justify-center p-4 bg-cardsBackground rounded-lg">
        <h2 className="my-2 text-lg sm:text-xl text-center text-encabezados">
          {title}
        </h2>
        <BookStatusBadgeLibrary status={status} />
        <p className="text-sm text-mainText mb-4 text-center line-clamp-3">
          {Synopsis}
        </p>
        <MainButton link={`/libro/${id}`} name="Leer" />
      </div>
    </article>
  );
};

export default BookCard;
