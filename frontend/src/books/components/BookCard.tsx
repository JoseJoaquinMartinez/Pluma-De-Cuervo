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
    <article className="bg-cardsBackground rounded-xl w-full px-4 py-2 flex flex-col mlg:flex-row pb-10">
      <div className="flex  items-center justify-center mlg:justify-end">
        <Image
          src={imagen}
          alt={title}
          width={300}
          height={300}
          className="rounded-xl"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full  bg-cardsBackground rounded-lg">
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
