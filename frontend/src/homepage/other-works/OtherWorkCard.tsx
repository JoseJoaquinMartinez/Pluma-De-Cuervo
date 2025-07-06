import React from "react";
import type { OtherWorkComponentProps } from "./interface/other-works-interface";
import MainButton from "@/components/shared/mainButton";

import { ImageComponent } from "@/components/shared/ImageComponent";

const OtherWorksCard: React.FC<OtherWorkComponentProps> = ({
  title,
  workText,
  buttonLink,
  buttonText,
  imagen,
}) => {
  return (
    <div className="bg-cardsBackground rounded-xl flex flex-col mlg:flex-row h-full w-full">
      <div className=" flex flex-col mlg:flex-row  items-center md:pr-6  py-2">
        <article className="flex flex-col md:pl-10 md:pr-5">
          <h2 className="text-xl font-bold text-encabezados text-center md:text-left">
            {title}
          </h2>
          <p className="my-2 text-mainText px-2">{workText}</p>
        </article>
        <div className="flex flex-col items-center justify-center ">
          <MainButton
            link={buttonLink}
            name={buttonText}
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </div>
      <div className="flex w-full h-full items-center justify-center mlg:justify-end">
        <ImageComponent imagen={imagen} title={title} />
      </div>
    </div>
  );
};
export default React.memo(OtherWorksCard);
