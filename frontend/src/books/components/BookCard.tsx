import { ImageComponent } from "@/components/shared/ImageComponent";
import MainButton from "@/components/shared/mainButton";
import React from "react";

const BookCard = ({ id, title, Synopsis, imagen }: BookCardComponentProps) => {
  return (
    <article className="w-full flex flex-col items-center justify-center">
      <div className="mb-2">
        <ImageComponent imagen={imagen} title={title} />
      </div>
      <div className="w-full flex flex-col items-center justify-center pb-6 px-1  rounded-lg bg-cardsBackground">
        <h2 className="my-2 text-encabezados text-lg sm:text-xl md:text-2xl line-clamp-2">
          {title}
        </h2>
        <p className="text-mainText text-pretty mb-2 line-clamp-3 md:line-clamp-none">
          {Synopsis}
        </p>
        <MainButton link={`/libro/${id}`} name="Leer" />
      </div>
    </article>
  );
};

export default BookCard;
