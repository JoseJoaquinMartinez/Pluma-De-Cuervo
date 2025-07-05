"use client";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import ErrorToast from "@/components/shared/ErrorToaster";
import { fetchOtherWorks } from "@/store/slices/otherWorks/thunks/fetchOtherWorks";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DesktopSlideshow } from "./slideshow/DesktopSlideshow";
import { MobileSlideshow } from "./slideshow/MobileSlideshow";

export const OtherWorkComponent = () => {
  const dispatch = useDispatch<AppDispatch>();

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
      <div className="col-span-1 items-center justify-center w-full">
        {/* Mobile Slideshow */}
        <MobileSlideshow otherWorks={otherWorks} className="block md:hidden" />

        {/*Desktop Slideshow */}
        <DesktopSlideshow
          otherWorks={otherWorks}
          className=" hidden md:block"
        />
      </div>
    </section>
  );
};
