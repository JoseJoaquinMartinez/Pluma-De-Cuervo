"use client";
import React from "react";
import { OtherWorkComponentProps } from "../interface/other-works-interface";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCreative,
  Navigation,
  Pagination,
} from "swiper/modules";

import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

import "./slideshow.css";
import OtherWorkCard from "../OtherWorkCard";

interface Props {
  otherWorks: OtherWorkComponentProps[];
  className?: string;
}

export const DesktopSlideshow = ({ otherWorks, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        grabCursor={true}
        autoHeight={true}
        hashNavigation={{
          watchState: true,
        }}
        style={
          {
            "--swiper-navigation-color": "#9C1209",
            "--swiper-pagination-color": "#9C1209",
          } as React.CSSProperties
        }
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectCreative]}
        className="mySwiper transition-all duration-500 ease-in-out"
      >
        {otherWorks.map((otherWork) => (
          <SwiperSlide key={otherWork.id} className="!h-full">
            <OtherWorkCard
              id={otherWork.id}
              title={otherWork.title}
              workText={otherWork.workText}
              buttons={otherWork.buttons}
              imagen={otherWork.imagen}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
