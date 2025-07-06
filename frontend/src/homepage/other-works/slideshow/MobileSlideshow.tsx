import React from "react";
import { OtherWorkComponentProps } from "../interface/other-works-interface";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import OtherWorkCard from "../OtherWorkCard";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

interface Props {
  otherWorks: OtherWorkComponentProps[];
  className?: string;
}

export const MobileSlideshow = ({ otherWorks, className }: Props) => {
  return (
    <div className={`${className} `}>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#9C1209",
            "--swiper-pagination-color": "#9C1209",
          } as React.CSSProperties
        }
        pagination
        autoplay={{
          delay: 10000,
        }}
        autoHeight={true}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2 transition-all duration-500 ease-in-out"
      >
        {otherWorks.map((otherWork) => (
          <SwiperSlide key={otherWork.id}>
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
