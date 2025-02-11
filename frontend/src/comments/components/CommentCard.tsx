"use client";
import React, { ChangeEvent, useState } from "react";
import MainButton from "@/components/shared/mainButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateCommentRead } from "../comment/utils/markCommentAsRead";
import { postAdminReplyToComment } from "../comment/utils/postAdminReplyToComment";
import { useRouter } from "next/navigation";
import ErrorToast from "@/components/shared/ErrorToaster";

export interface FormattedComment {
  id: number;
  createdAt: string;
  commentBody: string;
  read: boolean;
  paragraph: {
    id: number;
    paragraphText: string;
    chapter: {
      title: string;
      book: {
        title: string;
      };
    };
  };
  user?: {
    userName: string;
    email: string | null;
  };
  replies: FormattedComment[]; // Respuestas anidadas
}

const DeleteModal = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-cardsBackground p-4 rounded-lg shadow-lg">
      <p className="text-mainText">
        ¿Estás seguro de que deseas eliminar este comentario?
      </p>
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="bg-encabezados hover:bg-encabezados/90 text-white px-4 py-2 rounded"
          onClick={onConfirm}
        >
          Sí
        </button>
        <button
          className="bg-botones hover:bg-botones/90 px-4 py-2 rounded"
          onClick={onCancel}
        >
          No
        </button>
      </div>
    </div>
  </div>
);

export const CommentCard = ({
  id,
  commentBody,
  read: initialReadState,
  createdAt,
  paragraph,
  user,
  replies,
  onDelete,
}: FormattedComment & { onDelete: (commentId: number) => void }) => {
  const [responding, setResponding] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");
  const [markAsRead, setMarkAsRead] = useState<boolean>(initialReadState);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.Authentication);

  const updateReadComment = async () => {
    if (token) {
      const newState = !markAsRead;
      setMarkAsRead(newState);
      try {
        await updateCommentRead(id, newState, token);
        router.refresh();
      } catch (error) {
        setTimeout(() => {
          <ErrorToast
            message={
              error instanceof Error ? error.message : "Error desconocido"
            }
          />;
        }, 1000);
        setMarkAsRead(!newState);
      }
    }
  };

  const handleOpenResponseBox = () => {
    setResponding(!responding);
  };

  const handleResponse = async () => {
    if (token) {
      try {
        await postAdminReplyToComment({
          commentId: id,
          commentBody: response,
          token,
        });
        setResponse("");
        setResponding(false);
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(e.target.value);
  };

  const isMostRecent =
    replies.length === 0 ||
    new Date(createdAt) > new Date(replies[replies.length - 1].createdAt);

  return (
    <article className="flex flex-col justify-center my-2 rounded-lg p-2 w-full mlg:max-w-screen-xl md:max-w-screen-md">
      <section
        className={`flex flex-col my-2 rounded-lg p-2 text-mainText bg-cardsBackground ${
          markAsRead ? "opacity-60" : ""
        }`}
      >
        <header className="flex flex-row items-center justify-between gap-3 text-encabezados font-semibold my-2">
          <h3 className="text-sm">{paragraph.chapter.book.title}</h3>
          <h4>{paragraph.chapter.title}</h4>
          {user && (
            <div className="text-right">
              <p className="text-sm">
                {user.userName || user?.email?.split("@")[0]}
              </p>
              {user.email && user.email === "gps.beniel@gmail.com" ? (
                <></>
              ) : (
                <p className="text-xs text-gray-500">{user.email}</p>
              )}
            </div>
          )}
        </header>
        <p className="rounded-lg min-h-20">{commentBody}</p>
        <footer className="self-end text-xs py-2">
          <p className="text-mainText font-semibold">{createdAt}</p>
          <p
            className="cursor-pointer hover:text-encabezados"
            onClick={updateReadComment}
          >
            {markAsRead ? "Marcar como no leído" : "Marcar como leído"}
          </p>
          <div className="p-2">
            <MainButton
              name="Eliminar"
              onClick={() => {
                setOpenDeleteModal(true);
              }}
            />
          </div>
        </footer>
        {isMostRecent && responding && (
          <section className="flex flex-col items-center gap-2 transition-all w-full rounded-lg justify-center mlg:max-w-screen-xl md:max-w-screen-md bg-cardsBackground">
            <textarea
              className="h-44 border border-encabezados/50 text-mainText md:text-xl rounded-md focus:outline-none p-2 focus:ring-2 w-full focus:ring-encabezados"
              placeholder="Responde al comentario"
              value={response}
              onChange={handleInputChange}
            />
            <MainButton name="Enviar Comentario" onClick={handleResponse} />
          </section>
        )}
      </section>

      {replies.length > 0 && (
        <div className="ml-6 mt-4 border-l-2 border-encabezados pl-4">
          {replies.map((reply) => (
            <CommentCard key={reply.id} {...reply} onDelete={onDelete} />
          ))}
        </div>
      )}

      {isMostRecent && (
        <section className="flex flex-col md:flex-row justify-center items-center gap-2">
          <MainButton
            name={!responding ? "Responder" : "No responder"}
            onClick={handleOpenResponseBox}
          />
        </section>
      )}

      {openDeleteModal && (
        <DeleteModal
          onConfirm={() => {
            onDelete(id);
            setOpenDeleteModal(false);
          }}
          onCancel={() => setOpenDeleteModal(false)}
        />
      )}
    </article>
  );
};
