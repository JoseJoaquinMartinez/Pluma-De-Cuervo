import React from "react";
import { BentoCard } from "./BentoCard";
import { NewsLetterCard } from "./NewsLetterCard";

import { bentoSectionData } from "./data/bentoSectionData";

export default function HeroGrid() {
  return (
    <main className=" justify-center">
      <div className="max-w-screen-xl gap-6 grid-template-mobile md:grid-template-ipad mlg:grid-template-desktop">
        {bentoSectionData.map(
          (
            {
              title,
              text,
              buttonLink,
              buttonText,
              imagenSrc,
              reverse,
              colSpan,
              rowSpan,
            },
            index
          ) => (
            <BentoCard
              key={title}
              title={title}
              text={text}
              buttonLink={buttonLink}
              buttonText={buttonText}
              imagenSrc={imagenSrc}
              reverse={reverse}
              colSpan={colSpan}
              rowSpan={rowSpan}
              gridArea={
                index === 0
                  ? "plumaDeCuervo"
                  : index === 1
                  ? "sobreElAutor"
                  : "ultimosCapitulos"
              }
            />
          )
        )}
        <div
          className="col-span-2 row-span-1"
          style={{ gridArea: "newsletter" }}
        >
          <NewsLetterCard />
        </div>
      </div>
    </main>
  );
}
