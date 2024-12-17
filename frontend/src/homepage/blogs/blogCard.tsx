import React from "react";
import MainButton from "@/components/shared/mainButton";
import { lastFiveBlogInterface } from "./interfaces/blog";
import { ImageComponent } from "@/components/shared/ImageComponent";

const BlogCard = ({
  id,
  title,
  imagen,
  estimatedReadTime,
  createdAt,
}: lastFiveBlogInterface) => {
  return (
    <article className="flex flex-col items-center bg-cardsBackground text-mainText rounded-xl">
      <ImageComponent
        imagen={imagen}
        title={title}
        customMaxHeight="max-h-32"
        customMinHeight="min-h-32"
      />

      <div className=" flex flex-col items-center mt-10">
        <h2 className="text-encabezados mb-6 text-xl">{title}</h2>
        <MainButton name="Leer" link={`/blogs/all-blogs/blog/${id}`} />
      </div>
      <div className=" text-mainText opacity-50 text-sm self-end p-2">
        <p>
          {createdAt} · {estimatedReadTime}
        </p>
      </div>
    </article>
  );
};
export default React.memo(BlogCard);
