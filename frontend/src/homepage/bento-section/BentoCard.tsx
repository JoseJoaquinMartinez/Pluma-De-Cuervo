import Image from "next/image";
import MainButton from "../../components/shared/mainButton";
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
        <div className="md:w-1/2 relative flex flex-col items-center transition duration-500 ease-in-out transform shadow-xl overflow-clip rounded-xl sm:rounded-xl md:group-hover:-translate-y-1 md:group-hover:shadow-2xl">
          <Image
            src={imageSrc}
            alt={title}
            width={500}
            height={500}
            className="w-full h-full object-cover object-top md:scale-110 rounded-lg transition duration-500 hover:scale-100"
          />
        </div>
      </article>
    </div>
  );
};
