"use client";
import React, { ChangeEvent, useState } from "react";
import MainButton from "@/components/shared/mainButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateCommentRead } from "../comment/utils/markCommentAsRead";
import { useRouter } from "next/navigation";
import { postRegularUserReplyToComment } from "../comment/utils/postRegularUserReplyToComment";
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

export const RegularUserCommentCard = ({
  id,
  commentBody,
  read: initialReadState,
  createdAt,
  paragraph,
  user,
  replies,
}: FormattedComment) => {
  const [responding, setResponding] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");
  const [markAsRead, setMarkAsRead] = useState<boolean>(initialReadState);
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
        setMarkAsRead(!newState);
        if (error instanceof Error) {
          return <ErrorToast message={error.message} />;
        }
      }
    }
  };

  const handleOpenResponseBox = () => {
    setResponding(!responding);
  };

  const handleResponse = async () => {
    if (token) {
      try {
        await postRegularUserReplyToComment({
          commentId: id,
          commentBody: response,
          token,
        });
        setResponse("");
        setResponding(false);
        router.refresh();
      } catch (error) {
        if (error instanceof Error) {
          return <ErrorToast message={error.message} />;
        }
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
            <RegularUserCommentCard key={reply.id} {...reply} />
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
    </article>
  );
};
