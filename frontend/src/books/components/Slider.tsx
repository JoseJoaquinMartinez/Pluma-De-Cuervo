"use client";

import React, { useState } from "react";
import BookCard from "@/books/components/BookCard";
import Image from "next/image";
import { BookCardComponentProps } from "../interfaces/bookData";

const Slider = ({ books }: { books: BookCardComponentProps[] }) => {
  const [activeBook, setActiveBook] = useState<number>(0);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clickNext = () => {
    setActiveBook((prev) => (prev === books.length - 1 ? 0 : prev + 1));
    scrollToTop();
  };

  const clickPrev = () => {
    setActiveBook((prev) => (prev === 0 ? books.length - 1 : prev - 1));
    scrollToTop();
  };

  return (
    <section className="flex flex-col items-center w-full overflow-hidden">
      <article className="w-full flex justify-center items-center overflow-hidden transition-transform ease-in-out duration-500">
        <div
          className="w-full flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${activeBook * 100}%)`,
          }}
        >
          {books.map(
            ({ id, title, Synopsis, imagen }: BookCardComponentProps) => (
              <div
                key={id}
                className="w-full flex-shrink-0 flex justify-center items-center"
              >
                <BookCard
                  id={id}
                  title={title}
                  Synopsis={Synopsis}
                  imagen={imagen}
                />
              </div>
            )
          )}
        </div>
      </article>

      <article className="flex justify-between items-center gap-5 mt-2">
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

export default Slider;
