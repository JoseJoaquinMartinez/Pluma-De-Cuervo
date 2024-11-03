import Image from "next/image";

import type { BentoSectionProps } from "./interface/bentoSection";
import MainButton from "@/components/shared/mainButton";
import { ImageComponent } from "@/components/shared/ImageComponent";

export const BentoCard: React.FC<BentoSectionProps> = ({
  title,
  text,
  buttonLink,
  buttonText,
  imagenSrc,
  reverse,
  colSpan,
  rowSpan,
  gridArea,
}) => {
  return (
    <div className={`${colSpan} ${rowSpan}`} style={{ gridArea }}>
      <article
        className={`flex flex-col mlg:flex-row rounded-xl ${
          reverse ? "mlg:flex-row-reverse" : ""
        } bg-cardsBackground   h-full`}
      >
        <div className="mlg:w-1/2 flex flex-col  p-4">
          <h2 className="text-xl font-bold text-encabezados">{title}</h2>
          <p className="my-2 text-mainText">{text}</p>
          {(buttonLink || buttonText) && (
            <MainButton link={buttonLink} name={buttonText} />
          )}
        </div>
        <ImageComponent
          imagen={imagenSrc}
          title={title}
          specialWidth="mlg:w-1/2"
        />
      </article>
    </div>
  );
};

{
}
