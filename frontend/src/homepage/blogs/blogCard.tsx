import React from "react";
import MainButton from "@/components/shared/mainButton";
import { lastFiveBlogInterface } from "./interfaces/blog";
import { ImageComponent } from "@/components/shared/ImageComponent";

const BlogCard = ({ id, title, imagen, createdAt }: lastFiveBlogInterface) => {
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
      <div className="w-full  md:h-20 m-2">
        <h2 className="text-encabezados    w-full text-center">{title}</h2>
      </div>
      <MainButton name="Leer" link={`/blogs/all-blogs/blog/${id}`} />
      <footer className="text-mainText opacity-50 text-sm self-end p-2">
        <p>{createdAt}</p>
      </footer>
    </article>
  );
};
export default React.memo(BlogCard);
