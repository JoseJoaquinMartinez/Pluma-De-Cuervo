"use client";
import React, { ChangeEvent, useState } from "react";
import { Comment } from "../data/comment";
import MainButton from "@/components/shared/mainButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateCommentRead } from "../comment/utils/markCommentAsRead";

interface Props {
  comment: Comment;
}

export const CommentCard = ({
  id,
  commentBody,
  read,
  createdAt,
  paragraph,
}: Comment) => {
  const [responding, setResponding] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");
  const [markAsRead, setMarkAsRead] = useState<boolean>(read);
  const { token } = useSelector((state: RootState) => state.Authentication);

  const updateReadComment = () => {
    if (token) {
      setMarkAsRead(!markAsRead);
      updateCommentRead(id, markAsRead, token);
    }
  };

  const handleResponse = () => {
    setResponding(!responding);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(e.target.value);
  };

  return (
    <article className="flex flex-col ">
      <section className="flex flex-col bg-cardsBackground my-2 rounded-lg p-2 text-mainText mlg:max-w-screen-lg md:max-w-screen-md">
        <section className="flex flex-row gap-3 text-encabezados font-semibold justify-between">
          <p>{paragraph.chapter.title}</p>
          <p>{paragraph.chapter.book.title}</p>
        </section>

        <p>{commentBody}</p>

        <footer className="self-end text-xs">
          <p>{createdAt}</p>
          <p
            className="cursor-pointer hover:text-encabezados"
            onClick={() => updateReadComment()}
          >
            Marcar como leído
          </p>
        </footer>
      </section>
      {responding && (
        <section className="transition-all">
          <textarea
            className=" h-44 border border-encabezados/50 text-mainText md:text-xl rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-encabezados"
            placeholder="Responde al comentario"
            value={response}
            onChange={handleInputChange}
          />
        </section>
      )}
      <section className="self-center ">
        <MainButton
          name={!responding ? "Reponder" : "No responder"}
          onClick={() => handleResponse()}
        />
      </section>
    </article>
  );
};
