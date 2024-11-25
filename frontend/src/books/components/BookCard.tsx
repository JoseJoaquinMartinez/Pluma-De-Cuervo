import MainButton from "@/components/shared/mainButton";
import React from "react";
import Image from "next/image";

const BookCard = ({ id, title, Synopsis, imagen }: BookCardComponentProps) => {
  return (
    <article className="w-full flex flex-col items-center justify-center ">
      <div className="mb-2 w-full">
        <Image
          src={imagen}
          alt={title}
          width={500}
          height={500}
          className={`object-cover object-top  rounded-lg w-full`}
        />
      </div>
      <div className="flex flex-col items-center justify-center pb-6 px-1  rounded-lg bg-cardsBackground">
        <h2 className="my-2 text-encabezados text-lg sm:text-xl md:text-2xl ">
          {title}
        </h2>
        <p className="text-mainText text-pretty mb-2 line-clamp-3 ">
          {Synopsis}
        </p>
        <MainButton link={`/libro/${id}`} name="Leer" />
      </div>
    </article>
  );
};

export default BookCard;
