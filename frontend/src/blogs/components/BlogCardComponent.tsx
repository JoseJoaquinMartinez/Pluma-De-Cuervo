import React from "react";
import type { AllExistingBlog } from "../interface/blogs";

import MainButton from "@/components/shared/mainButton";
import { ImageComponent } from "@/components/shared/ImageComponent";

export const BlogCardComponent = ({
  id,
  title,
  estimatedReadTime,
  imagen,
  createdAt,
}: AllExistingBlog) => {
  return (
    <article className="flex flex-col items-center bg-cardsBackground text-mainText rounded-xl">
      <div>
        <ImageComponent
          imagen={imagen}
          title={title}
          customMaxHeight="max-h-32"
          customMinHeight="min-h-32"
        />
      </div>
      <h2 className="text-encabezados p-2">{title}</h2>
      <MainButton name="Leer" link={`/blogs/all-blogs/blog/${id}`} />
      <div className="self-end">
        <span className="text-mainText opacity-50 text-sm px-2">
          {createdAt} · {estimatedReadTime}
        </span>
      </div>
    </article>
  );
};
