import React from "react";
import type { AllExistingBlog } from "../interface/blogs";

import MainButton from "@/components/shared/mainButton";
import { ImageComponent } from "@/components/shared/ImageComponent";

export const BlogCardComponent = ({
  id,
  title,
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
      <div className="w-full md:h-20">
        <h2 className="text-encabezados p-2  w-full text-center">{title}</h2>
      </div>
      <MainButton name="Leer" link={`/blogs/all-blogs/blog/${id}`} />
      <div className="self-end">
        <span className="text-mainText opacity-50 text-sm px-2">
          {createdAt}
        </span>
      </div>
    </article>
  );
};
