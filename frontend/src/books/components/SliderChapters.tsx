"use client";

import React, { useState } from "react";
import Image from "next/image";
import ChapterCard from "@/app/(un-auth-regular-user)/ultimos-capitulos/components/ChapterCard";
import { LastFiveChapters } from "../interfaces/bookData";

interface SliderChaptersProps {
  chapters: LastFiveChapters[];
  bookId: number;
}

const SliderChapters = ({ chapters, bookId }: SliderChaptersProps) => {
  const [activeChapter, setActiveChapater] = useState<number>(0);

  const clickNext = () => {
    setActiveChapater((prev) => (prev === chapters.length - 1 ? 0 : prev + 1));
  };

  const clickPrev = () => {
    setActiveChapater((prev) => (prev === 0 ? chapters.length - 1 : prev - 1));
  };

  return (
    <section className="flex flex-col">
      <article className="w-full flex justify-center items-center overflow-hidden transition-transform ease-in-out duration-500">
        <div
          className="w-full flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${activeChapter * 100}%)`,
          }}
        >
          {chapters.map(
            ({ id, title, imagen, createdAt }: LastFiveChapters, index) => (
              <div key={id} className="w-full flex-shrink-0">
                <ChapterCard
                  id={id}
                  title={title}
                  imagen={imagen}
                  createdAt={createdAt}
                  bookId={bookId}
                />
              </div>
            )
          )}
        </div>
      </article>

      <article className="flex justify-center items-center gap-5 mt-2">
        <button
          onClick={clickPrev}
          className="p-2 bg-cardsBackground rounded-full shadow hover:bg-cardsBackground/50"
        >
          <Image
            alt="arrow left"
            src="/shared/arrow-left.png"
            width={30}
            height={30}
          />
        </button>
        <button
          onClick={clickNext}
          className="p-2 bg-cardsBackground rounded-full shadow hover:bg-cardsBackground/50"
        >
          <Image
            alt="arrow right"
            src="/shared/arrow-right.png"
            width={30}
            height={30}
          />
        </button>
      </article>
    </section>
  );
};

export default SliderChapters;
