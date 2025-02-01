import { NewUserInterface } from "@/app/authComponents/interfaces/singupInterface";
import { ImageComponent } from "@/components/shared/ImageComponent";
import MainButton from "@/components/shared/mainButton";
import React from "react";
interface Props {
  bookTitle: string;
  imagen: string;
  title: string;
  createdAt: string;
  estimatedReadTime: string;
  data?: NewUserInterface;
  isLoggedIn?: boolean;
  bookId: number;
  chapterId: number;
}

export const TitlesFromChapterComponent = ({
  bookTitle,
  imagen,
  title,
  createdAt,
  estimatedReadTime,
  isLoggedIn,
  data,
  bookId,
  chapterId,
}: Props) => {
  return (
    <article className="flex flex-col w-full px-4 max-w-screen-xl">
      <section className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-between w-full px-2 mt-4">
          <h2 className="text-encabezados text-2xl  text-start mb-4 self-start ">
            {bookTitle}
          </h2>
          {isLoggedIn && data?.user.role === "admin" ? (
            <MainButton
              name="Editar libro"
              link={`/admin/libros/libro/${bookId}/capitulo/${chapterId}/editar`}
            />
          ) : (
            <></>
          )}
        </div>
        <div>
          <ImageComponent imagen={imagen} title={title} />
        </div>
      </section>
      <section className="flex flex-col items-center">
        <h3 className="text-encabezados text-2xl mb-4 px-2 mt-4">{title}</h3>
        <p className="text-mainText/50 text-sm">GPS</p>
        <span className="text-mainText/50 text-sm">
          {createdAt} · {estimatedReadTime}
        </span>
      </section>
    </article>
  );
};
{
  /* <article className="flex flex-col w-full px-4 max-w-screen-xl">
      <section className="flex flex-col items-center">
        <h2 className="text-encabezados text-2xl  text-start mb-4 self-start px-2 mt-4">
          {bookTitle}
        </h2>
        <ImageComponent imagen={imagen} title={title} />
      </section>
      <section className="flex flex-col items-center">
        <h3 className="text-encabezados text-2xl mb-4 px-2 mt-4">{title}</h3>
        <p className="text-mainText/50 text-sm">GPS</p>
        <span className="text-mainText/50 text-sm">
          {createdAt} · {estimatedReadTime}
        </span>
      </section>
    </article> */
}
{
  /* <article className="flex flex-col items-center w-full px-4 mt-2 max-w-screen-xl">
      <section className="flex flex-col md:flex-row items-center md:justify-between w-full">
        <section className="flex flex-col items-center">
          <h2 className="text-encabezados text-xl md:text-2xl px-2 mt-4">
            {bookTitle}
          </h2>
          <div className="flex flex-col items-center">
            <h3 className="text-encabezados text-xl md:text-3xl mb-4 px-2 mt-4">
              {title}
            </h3>
            <p className="text-mainText/50 text-sm md:text-lg">GPS</p>
            <span className="text-mainText/50 text-sm mb-2 md:text-lg">
              {createdAt} · {estimatedReadTime}
            </span>
          </div>
        </section>
        <div>
          <ImageComponent imagen={imagen} title={title} />
        </div>
      </section>
    </article> */
}
