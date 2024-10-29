import Image from "next/image";
import MainButton from "@/components/shared/mainButton";
import type { OtherWorkProps } from "./data/otherWorkData";

export const OtherWorksCard: React.FC<OtherWorkProps> = ({
  title,
  text,
  buttonLink,
  buttonText,
  imageSrc,
}) => {
  return (
    <div>
      <article>
        <h2>{title}</h2>
        <p>{text}</p>
      </article>
      <MainButton link={buttonLink} name={buttonText} />
      <article>
        <Image src={imageSrc} alt={title} width={500} height={500} />
      </article>
    </div>
  );
};
