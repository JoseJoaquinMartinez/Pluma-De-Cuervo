import React from "react";

import { ImageComponent } from "@/components/shared/ImageComponent";
import { SingleBlog } from "../interface/blogs";
import MainButton from "@/components/shared/mainButton";

interface IsAdminLoggedIn extends SingleBlog {
  role?: string;
}

export const SingleBlogComponent = ({
  id,
  title,
  imagen,
  createdAt,
  blogText,
  role,
}: IsAdminLoggedIn) => {
  return (
    <article className="flex flex-col w-full px-4 max-w-screen-xl">
      <div className="flex flex-col md:flex-row justify-between mt-2">
        <h1 className="text-encabezados text-2xl self-start mt-2">
          Noticias & Pensamientos
        </h1>
        {role === "admin" && (
          <div>
            <MainButton
              name="Editar Blog"
              link={`/admin/blogs/modificar-blog/${id}`}
            />
          </div>
        )}
      </div>
      <section className="flex flex-col items-center gap-4 mt-4">
        <div>
          {typeof imagen === "string" && (
            <ImageComponent imagen={imagen} title={title} />
          )}
        </div>
        <h2 className="text-encabezados text-2xl">{title}</h2>
        <p className="text-mainText/50 text-sm">GPS</p>
        <span className="text-mainText/50 text-sm">{createdAt}</span>
      </section>

      <section className="mt-2 bg-cardsBackground rounded-lg">
        {blogText.split("\n").map((line, index) => (
          <p key={index} className="text-mainText p-2 break-words">
            {line}
          </p>
        ))}
      </section>
    </article>
  );
};
