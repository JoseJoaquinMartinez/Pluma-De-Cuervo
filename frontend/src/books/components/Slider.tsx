"use client";

import BookCard from "@/books/components/BookCard";

import { BookCardComponentProps } from "../interfaces/bookData";

import { Swiper, SwiperSlide } from "swiper/react";

import { FreeMode, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const Slider = ({ books }: { books: BookCardComponentProps[] }) => {
  return (
    <>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#9C1209",
            "--swiper-pagination-color": "#9C1209",
          } as React.CSSProperties
        }
        pagination
        autoHeight={true}
        modules={[FreeMode, Pagination]}
        className="mySwiper2 transition-all duration-500 ease-in-out"
      >
        {books.map(
          ({ id, title, Synopsis, imagen, status }: BookCardComponentProps) => (
            <SwiperSlide key={id} className="!w-full">
              <BookCard
                id={id}
                title={title}
                Synopsis={Synopsis}
                imagen={imagen}
                status={status}
              />
            </SwiperSlide>
          )
        )}
      </Swiper>
    </>
  );
};

export default Slider;
