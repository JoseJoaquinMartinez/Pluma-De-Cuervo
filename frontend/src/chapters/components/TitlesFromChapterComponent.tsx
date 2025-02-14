import { NewUserInterface } from "@/app/authComponents/interfaces/singupInterface";
import { ImageComponent } from "@/components/shared/ImageComponent";
import MainButton from "@/components/shared/mainButton";
import React from "react";
interface Props {
  bookTitle: string;
  imagen: string;
  title: string;
  createdAt: string;
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
              name="Editar capítulo"
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
        <span className="text-mainText/50 text-sm">{createdAt}</span>
      </section>
    </article>
  );
};
