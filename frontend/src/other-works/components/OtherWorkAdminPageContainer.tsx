"use client";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import ErrorToast from "@/components/shared/ErrorToaster";
import MainButton from "@/components/shared/mainButton";

import { OtherWorkAdminCard } from "@/other-works/components/OtherWorkAdminCard";
import { deleteOtherWork } from "@/store/slices/otherWorks/thunks/deleteOtherWorks";
import { fetchOtherWorks } from "@/store/slices/otherWorks/thunks/fetchOtherWorks";

import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

export const OtherWorkAdminPageContainer = () => {
  const {
    data: otherWorks,
    loading,
    error,
  } = useSelector((state: RootState) => state.OtherWorks);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchOtherWorks());
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full ">
        <BookLoaderComponent />
      </div>
    );
  }
  if (!otherWorks || otherWorks.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl text-gray-500">
          No hay otros trabajos disponibles
        </h1>
      </div>
    );
  }
  if (error) {
    return <ErrorToast message={error} />;
  }
  const onDelete = (id: number) => {
    dispatch(deleteOtherWork(id));
    dispatch(fetchOtherWorks());
  };

  return (
    <section className="flex flex-col items-center justify-center ">
      <div
        className="grid grid-cols-1 mlg:grid-cols-2 items-center gap-5 mt-10
     mx-5 px-2 py-5"
      >
        {otherWorks.map((otherWork, index) => {
          return (
            <OtherWorkAdminCard
              key={index}
              otherWork={otherWork}
              onDelete={onDelete}
            />
          );
        })}
      </div>
      <MainButton
        link="/admin/otros-trabajos/crear"
        name="Crear otro trabajo"
      />
    </section>
  );
};
