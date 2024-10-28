import Image from "next/image";
import MainButton from "../shared/mainButton";
import type { BentoSectionProps } from "./interface/bentoSection";

export const BentoCard: React.FC<BentoSectionProps> = ({
  title,
  text,
  buttonLink,
  buttonText,
  imageSrc,
  reverse,
  colSpan,
  rowSpan,
  gridArea,
}) => {
  return (
    <div className={`${colSpan} ${rowSpan}`} style={{ gridArea }}>
      <article
        className={`flex flex-col md:flex-row ${
          reverse ? "md:flex-row-reverse" : ""
        } bg-cardsBackground  rounded-lg h-full`}
      >
        <div className="md:w-1/2 flex flex-col  p-4">
          <h2 className="text-xl font-bold text-encabezados">{title}</h2>
          <p className="my-2 text-mainText">{text}</p>
          {(buttonLink || buttonText) && (
            <MainButton link={buttonLink} name={buttonText} />
          )}
        </div>
        <div className="md:w-1/2">
          <Image
            src={imageSrc}
            alt={title}
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </article>
    </div>
  );
};
