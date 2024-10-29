import React from "react";
import { BentoCard } from "./BentoCard";
import { NewsLetterCard } from "./NewsLetterCard";

import { bentoSectionData } from "./data/bentoSectionData";

export default function HeroGrid() {
  return (
    <main className="p-10 justify-center">
      <div className="max-w-screen-xl gap-6 grid-template-mobile md:grid-template-desktop">
        {bentoSectionData.map(
          (
            {
              title,
              text,
              buttonLink,
              buttonText,
              imageSrc,
              reverse,
              colSpan,
              rowSpan,
            },
            index
          ) => (
            <BentoCard
              title={title}
              text={text}
              buttonLink={buttonLink}
              buttonText={buttonText}
              imageSrc={imageSrc}
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
