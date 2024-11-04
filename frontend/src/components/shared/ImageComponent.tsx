import React from "react";
import Image from "next/image";

interface ImageProps {
  imagen: string;
  title: string;
  specialWidth?: string;
  customMaxHeight?: string;
  customMinHeight?: string;
}

export const ImageComponent = ({
  imagen,
  title,
  specialWidth,
  customMinHeight,
  customMaxHeight,
}: ImageProps) => {
  return (
    <div
      className={`${specialWidth} h-full w-full  relative flex flex-col items-center transition duration-500 ease-in-out transform shadow-xl overflow-clip rounded-xl sm:rounded-xl mlg:group-hover:-translate-y-1 mlg:group-hover:shadow-2xl`}
    >
      <Image
        src={imagen}
        alt={title}
        width={500}
        height={500}
        className={`h-full  object-cover object-top mlg:scale-110 rounded-lg transition duration-500 hover:scale-100 ${customMinHeight} ${customMaxHeight}`}
      />
    </div>
  );
};
