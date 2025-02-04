"use client";
import React, { ChangeEvent, useState } from "react";
import { Comment } from "../data/comment";
import MainButton from "@/components/shared/mainButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateCommentRead } from "../comment/utils/markCommentAsRead";
import { postAdminReplyToComment } from "../comment/utils/postAdminReplyToComment";

interface Props {
  comment: Comment;
}

export const CommentCard = ({
  id,
  commentBody,
  read,
  createdAt,
  paragraph,
  replies = [],
}: Comment) => {
  const [responding, setResponding] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");
  const [markAsRead, setMarkAsRead] = useState<boolean>(read);
  const { token } = useSelector((state: RootState) => state.Authentication);

  const updateReadComment = async () => {
    if (token) {
      const newState = !markAsRead;
      setMarkAsRead(newState);
      try {
        await updateCommentRead(id, newState, token);
      } catch (error) {
        setMarkAsRead(markAsRead);
      }
    }
  };

  const habndleOpenResponseBox = () => {
    setResponding(!responding);
  };
  const handleResponse = async () => {
    if (token) {
      try {
        const apiResponse = await postAdminReplyToComment({
          commentId: id,
          commentBody: response,
          token,
        });

        setResponse("");
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(e.target.value);
  };

  return (
    <article
      className={`flex flex-col justify-center my-2 rounded-lg p-2 w-full mlg:max-w-screen-xl md:max-w-screen-md ${
        markAsRead ? "opacity-60" : ""
      }`}
    >
      <section className="flex flex-col my-2 rounded-lg p-2 text-mainText  bg-cardsBackground">
        <header className="flex flex-row gap-3 text-encabezados font-semibold justify-between my-2">
          <h3>{paragraph.chapter.title}</h3>
          <h3>{paragraph.chapter.book.title}</h3>
        </header>

        <p className={` rounded-lg min-h-20`}>{commentBody}</p>

        <footer className="self-end text-xs py-2">
          <p className="text-mainText font-semibold">{createdAt}</p>

          <p
            className="cursor-pointer hover:text-encabezados"
            onClick={() => updateReadComment()}
          >
            {read ? "Marcar como no leído" : "Marcar como leído"}
          </p>
        </footer>
        {responding && (
          <section className="flex flex-col items-center gap-2 transition-all w-full rounded-lg justify-center  mlg:max-w-screen-lg md:max-w-screen-md bg-cardsBackground">
            <textarea
              className=" h-44 border  border-encabezados/50 text-mainText md:text-xl rounded-md  focus:outline-none p-2 focus:ring-2 w-full focus:ring-encabezados"
              placeholder="Responde al comentario"
              value={response}
              onChange={handleInputChange}
            />
            <MainButton
              name={"Enviar Comentario"}
              onClick={() => handleResponse()}
            />
          </section>
        )}
      </section>

      <section className="flex flex-col md:flex-row justify-center items-center gap-2">
        <MainButton
          name={!responding ? "Reponder" : "No responder"}
          onClick={() => habndleOpenResponseBox()}
        />
      </section>
      {replies.length > 0 && (
        <div className="ml-6 mt-4 border-l-2 border-gray-300 pl-4">
          {replies.map((reply) => (
            <CommentCard key={reply.id} {...reply} />
          ))}
        </div>
      )}
    </article>
  );
};
