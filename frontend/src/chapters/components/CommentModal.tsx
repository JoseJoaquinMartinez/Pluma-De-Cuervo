import { postRegularUserNewComment } from "@/comments/comment/utils/postRegularUserNewComment";
import MainButton from "@/components/shared/mainButton";

import React from "react";

interface Props {
  closeModalOnOverlayClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  setNewComment: React.Dispatch<
    React.SetStateAction<{
      paragraphId: number | null;
      newComment: string;
    }>
  >;
  newComment: string;
  paragraphId: number | null;
  setIsCommentOpen: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null;
}

export interface CommentSubmitProps {
  paragraphId: number | null;
  newComment: string;
}

export const CommentModal = ({
  closeModalOnOverlayClick,
  setNewComment,
  newComment,
  paragraphId,
  setIsCommentOpen,
  token,
}: Props) => {
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment((prev) => ({
      ...prev,
      newComment: e.target.value,
    }));
  };

  const handleSubmit = ({ paragraphId, newComment }: CommentSubmitProps) => {
    if (!paragraphId || !newComment.trim()) {
      alert("Debes ingresar un comentario válido y seleccionar un párrafo.");
      return;
    }

    postRegularUserNewComment({ paragraphId, comment: newComment, token });
    setIsCommentOpen(false);
  };
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
          onChange={handleTextAreaChange}
          placeholder="Deja tu comentario"
        />
        <div className="flex gap-2 w-full items-center justify-center">
          <MainButton
            name="Comentar"
            onClick={() => handleSubmit({ paragraphId, newComment })}
            disabled={!newComment.trim() || !paragraphId}
          />
          <MainButton name="Cerrar" onClick={() => setIsCommentOpen(false)} />
        </div>
      </article>
    </div>
  );
};
