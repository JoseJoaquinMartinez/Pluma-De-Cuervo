import React from "react";

import { ImageComponent } from "@/components/shared/ImageComponent";
import { SingleBlog } from "../interface/blogs";

export const SingleBlogComponent = ({
  id,
  title,
  imagen,
  createdAt,
  blogText,
  estimatedReadTime,
}: SingleBlog) => {
  return (
    <article className="flex flex-col w-full px-4 max-w-screen-xl">
      <h1 className="text-encabezados text-2xl self-start mt-2">
        Noticias & Pensamientos
      </h1>
      <section className="flex flex-col items-center gap-4 mt-4">
        <div>
          <ImageComponent imagen={imagen} title={title} />
        </div>
        <h2 className="text-encabezados text-2xl">{title}</h2>
        <p className="text-mainText/50 text-sm">GPS</p>
        <span className="text-mainText/50 text-sm">
          {createdAt} · {estimatedReadTime}
        </span>
      </section>

      <section className="mt-2 bg-cardsBackground rounded-lg">
        <p className="text-mainText p-2 break-words whitespace-pre-wrap">
          {blogText}
        </p>
      </section>
    </article>
  );
};
