import { postRegularUserNewComment } from "@/comments/comment/utils/postRegularUserNewComment";
import MainButton from "@/components/shared/mainButton";
import React from "react";
import { UpdatedUserCommentProps } from "../chapter/interface/comments";
import { deleteUserComment } from "@/comments/comment/utils/deleteUserCommnet";

interface Props {
  closeModalOnOverlayClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  setNewComment: React.Dispatch<React.SetStateAction<CommentSubmitProps>>;
  newComment: string;
  paragraphId: number | null;
  commentId?: number | null;
  setIsCommentOpen: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null;
  setUpdatedUserComments: React.Dispatch<
    React.SetStateAction<UpdatedUserCommentProps[]>
  >;
  updatedUserComments: UpdatedUserCommentProps[];
}

export interface CommentSubmitProps {
  paragraphId: number | null;
  newComment: string;
  commentId?: number | null;
}

export const CommentModal = ({
  closeModalOnOverlayClick,
  setNewComment,
  newComment,
  paragraphId,
  setIsCommentOpen,
  token,
  setUpdatedUserComments,
  commentId,
  updatedUserComments,
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
    postRegularUserNewComment({ paragraphId, comment: newComment, token }).then(
      (response) => {
        if (response?.newComment) {
          const { id, commentBody, paragraphId } = response.newComment;

          setUpdatedUserComments((prev) => [
            ...prev,
            { id, paragraphId, commentBody },
          ]);
        } else {
          alert("No se pudo crear el comentario. Inténtalo de nuevo.");
        }
      }
    );
    setIsCommentOpen(false);
  };

  const handleDelete = (commentId: number) => {
    if (token) {
      deleteUserComment({ commentId, token });
      setUpdatedUserComments((prev) =>
        prev.filter((comment) => comment.id !== commentId)
      );
      setIsCommentOpen(false);
    }
  };

  const existingComment = updatedUserComments.find(
    (comment) => comment.paragraphId === paragraphId
  );

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
        {existingComment ? (
          <p className="text-mainText mb-4 rounded-lg w-full h-32 bg-gray-100 p-2">
            {existingComment.commentBody}
          </p>
        ) : (
          <textarea
            className="text-mainText mb-4 rounded-lg w-full h-32"
            onChange={handleTextAreaChange}
            placeholder="Deja tu comentario"
          />
        )}

        <div className="flex gap-2 w-full items-center justify-center">
          {existingComment ? (
            commentId ? (
              <MainButton
                name="Eliminar"
                onClick={() => handleDelete(commentId)}
              />
            ) : (
              <></>
            )
          ) : (
            <MainButton
              name="Comentar"
              onClick={() => handleSubmit({ paragraphId, newComment })}
              disabled={!newComment.trim() || !paragraphId}
            />
          )}
          <MainButton name="Cerrar" onClick={() => setIsCommentOpen(false)} />
        </div>
      </article>
    </div>
  );
};
