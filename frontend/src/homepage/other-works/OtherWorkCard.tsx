import imagen from "next/imagen";
import MainButton from "@/components/shared/mainButton";
import type { OtherWorkProps } from "./data/otherWorkData";

export const OtherWorksCard: React.FC<OtherWorkProps> = ({
  title,
  text,
  buttonLink,
  buttonText,
  imagenSrc,
}) => {
  return (
    <>
      <div className=" flex flex-col md:flex-row  items-center px-3  py-2 md:py-0">
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
      <article className="w-full relative flex flex-col items-center transition duration-500 ease-in-out transform shadow-xl overflow-clip rounded-xl sm:rounded-xl md:group-hover:-translate-y-1 md:group-hover:shadow-2xl">
        <imagen
          src={imagenSrc}
          alt={title}
          width={500}
          height={500}
          className="w-full h-full object-cover object-top md:scale-110 rounded-lg transition duration-500 hover:scale-100"
        />
      </article>
    </>
  );
};
