"use client";
import MainButton from "@/components/shared/mainButton";
import { OtherWorkComponentProps } from "@/homepage/other-works/interface/other-works-interface";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface OtherWorkCardProps {
  otherWork: OtherWorkComponentProps;
  onDelete: (id: number) => void;
}

export const OtherWorkAdminCard = ({
  otherWork,
  onDelete,
}: OtherWorkCardProps) => {
  const router = useRouter();
  return (
    <article className="bg-cardsBackground rounded-xl w-full px-4 py-2 flex flex-col mlg:flex-row pb-10">
      <div className="flex items-center justify-center mr-2 h-full">
        <Image
          src={otherWork.imagen}
          alt={otherWork.title}
          width={300}
          height={300}
          className="rounded-xl"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full  bg-cardsBackground rounded-lg">
        <h2 className="my-2 text-lg sm:text-xl text-center text-encabezados">
          {otherWork.title}
        </h2>

        <p className="text-sm text-mainText mb-4 ">{otherWork.workText}</p>
        <div className="flex flex-row items-center justify-center gap-2">
          <MainButton
            name="Eliminar"
            onClick={() => onDelete(otherWork.id)}
            type="button"
          />
          <MainButton
            name="Editar"
            onClick={() =>
              router.push(`/admin/otros-trabajos/editar/${otherWork.id}`)
            }
            type="button"
          />
        </div>
      </div>
    </article>
  );
};
