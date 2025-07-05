"use client";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import ErrorToast from "@/components/shared/ErrorToaster";
import MainButton from "@/components/shared/mainButton";

import { OtherWorkAdminCard } from "@/other-works/components/OtherWorkAdminCard";
import { deleteOtherWork } from "@/store/slices/otherWorks/thunks/deleteOtherWorks";
import { fetchOtherWorks } from "@/store/slices/otherWorks/thunks/fetchOtherWorks";

import { AppDispatch, RootState } from "@/store/store";

import { useDispatch, useSelector } from "react-redux";

export default function OtherWorksPage() {
  const {
    data: otherWorks,
    loading,
    error,
  } = useSelector((state: RootState) => state.OtherWorks);
  const dispatch = useDispatch<AppDispatch>();

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
  //todo: add endpoint to update other works
  const onEdit = (id: number) => {
    console.log("Otro trabajo editado", id);
  };
  return (
    <section className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col mlg:flex-row mlg:justify-between px-10 items-center justify-center w-full mt-5">
        <h1 className="text-2xl text-encabezados font-bold ">Otros Trabajos</h1>
        <MainButton
          link="/admin/otros-trabajos/crear"
          name="Crear otro trabajo"
        />
      </div>
      <div
        className="grid grid-cols-1 mlg:grid-cols-2 items-center gap-5 mt-10
     mx-5 px-2"
      >
        {otherWorks.map((otherWork, index) => {
          return (
            <OtherWorkAdminCard
              key={index}
              otherWork={otherWork}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          );
        })}
      </div>
    </section>
  );
}
