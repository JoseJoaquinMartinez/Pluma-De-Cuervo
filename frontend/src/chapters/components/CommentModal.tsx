import MainButton from "@/components/shared/mainButton";
import React from "react";

interface Props {
  closeModalOnOverlayClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleOpenComment: () => void;
}

export const CommentModal = ({
  closeModalOnOverlayClick,
  handleOpenComment,
}: Props) => {
  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={closeModalOnOverlayClick}
    >
      <article
        id="modal"
        className="bg-navFoot rounded-lg p-4 z-50 flex flex-col items-center w-[300px]"
      >
        <textarea
          className="text-mainText mb-4 rounded-lg w-full h-32"
          onChange={() => console.log("change textarea")}
          placeholder="Deja tu comentario"
        />
        <div className="flex gap-2 w-full items-center justify-center">
          <MainButton
            name="Comentar"
            onClick={() => console.log("click comentar")}
          />
          <MainButton name="Cerrar" onClick={handleOpenComment} />
        </div>
      </article>
    </div>
  );
};
