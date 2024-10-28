import React from "react";
import { BentoCard } from "./BentoCard";
import { NewsLetterCard } from "./NewsLetterCard";

import { bentoSectionData } from "./data/bentoSectionData";

export default function HeroGrid() {
  return (
    <main className="p-10 justify-center">
      <div
        className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-screen-xl"
        style={{
          gridTemplateAreas: `
        "plumaDeCuervo  sobreElAutor sobreElAutor"
        "ultimosCapitulos sobreElAutor sobreElAutor" 
        "newsletter  newsletter newsletter"`,
          gridTemplateRows:
            "minmax(150px, auto) minmax(200px, auto) minmax(100px, auto)",
        }}
      >
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
