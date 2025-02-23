"use client";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import ErrorToast from "@/components/shared/ErrorToaster";
import { fetchOtherWorks } from "@/store/slices/otherWorks/thunks/fetchOtherWorks";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtherWorksCard from "@/homepage/other-works/OtherWorkCard";

export const OtherWorkComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const {
    data: otherWorks,
    loading,
    error,
    fetched,
  } = useSelector((state: RootState) => state.OtherWorks);

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchOtherWorks());
    }
  }, [dispatch, fetched]);

  useEffect(() => {
    if (!otherWorks?.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((current) =>
        current === otherWorks.length - 1 ? 0 : current + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [otherWorks]);

  if (loading) {
    return <BookLoaderComponent />;
  }

  if (error) {
    return <ErrorToast message={error} />;
  }

  if (!otherWorks?.length) {
    return null;
  }

  return (
    <section className="w-full  mx-auto ">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {otherWorks.map((work) => (
            <div key={work.id} className="w-full flex-shrink-0">
              <OtherWorksCard
                id={work.id}
                title={work.title}
                workText={work.workText}
                buttonLink={work.buttonLink}
                buttonText={work.buttonText}
                imagen={work.imagen}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
