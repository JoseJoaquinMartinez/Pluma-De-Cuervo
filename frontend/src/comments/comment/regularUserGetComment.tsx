"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FormattedComment } from "../components/CommentCard";
import { formatComment } from "./utils/formatComment";
import { getRegularUserComments } from "./utils/getRegularUserComments";
import { RegularUserCommentCard } from "../components/RegularUserCommentCard";

export const RegularUserGetComment = () => {
  const [comments, setComments] = useState<FormattedComment[]>([]);
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
  const { token } = useSelector((state: RootState) => state.Authentication);

  useEffect(() => {
    const fetchComments = async () => {
      if (token) {
        try {
          const fetchedComments = await getRegularUserComments(token);
          const formattedComments = fetchedComments.comments.map((comment) =>
            formatComment(comment)
          );
          setComments(formattedComments);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      }
    };

    fetchComments();
  }, [token]);

  const filteredComments = comments.filter((comment) => {
    if (filter === "all") return true;
    if (filter === "read") return comment.read;
    if (filter === "unread") return !comment.read;
    return;
  });
  return (
    <div className="w-full">
      <section className="flex justify-center gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-md ${
            filter === "all"
              ? "bg-botones text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setFilter("all")}
        >
          Todos
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            filter === "read"
              ? "bg-botonesSecundarios text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setFilter("read")}
        >
          Leídos
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            filter === "unread"
              ? "bg-encabezados text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setFilter("unread")}
        >
          No Leídos
        </button>
      </section>
      {filteredComments.length > 0 ? (
        filteredComments.map((comment) => (
          <RegularUserCommentCard key={comment.id} {...comment} />
        ))
      ) : (
        <div className="text-center text-gray-500">
          No hay comentarios que mostrar
        </div>
      )}
    </div>
  );
};
