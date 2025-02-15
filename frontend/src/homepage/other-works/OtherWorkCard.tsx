import React from "react";

import MainButton from "@/components/shared/mainButton";
import type { OtherWorkProps } from "./data/otherWorkData";
import { ImageComponent } from "@/components/shared/ImageComponent";

const OtherWorksCard: React.FC<OtherWorkProps> = ({
  title,
  text,
  buttonLink,
  buttonText,
  imageSrc,
}) => {
  return (
    <div className="bg-cardsBackground rounded-xl flex flex-col mlg:flex-row">
      <div className=" flex flex-col mlg:flex-row  items-center pr-6  py-2">
        <article className="flex flex-col px-10">
          <h2 className="text-xl font-bold text-encabezados">{title}</h2>
          <p className="my-2 text-mainText">{text}</p>
        </article>
        <MainButton
          link={buttonLink}
          name={buttonText}
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>

      <ImageComponent imagen={imageSrc} title={title} />
    </div>
  );
};
export default React.memo(OtherWorksCard);
