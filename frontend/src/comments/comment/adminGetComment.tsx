"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getUserCommentsByAdmin } from "./utils/adminGetUserComments";
import { deleteComment } from "../comment/utils/deleteComment";
import { CommentCard, FormattedComment } from "../components/CommentCard";
import { formatComment } from "./utils/formatComment";
import { useRouter } from "next/navigation";

export const AdminGetComment = () => {
  const [comments, setComments] = useState<FormattedComment[]>([]);
  const [filteredComments, setFilteredComments] = useState<FormattedComment[]>(
    []
  );
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
  const { token } = useSelector((state: RootState) => state.Authentication);
  const router = useRouter();

  useEffect(() => {
    const fetchComments = async () => {
      if (!token) return;
      try {
        const fetchedComments = await getUserCommentsByAdmin(token);
        const formattedComments = fetchedComments.comments.map(formatComment);
        setComments(formattedComments);
        setFilteredComments(formattedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [token]);

  useEffect(() => {
    setFilteredComments(() => {
      if (filter === "all") return comments;
      if (filter === "read") return comments.filter((comment) => comment.read);
      if (filter === "unread")
        return comments.filter((comment) => !comment.read);
      return comments;
    });
  }, [comments, filter]);

  const handleDeleteComment = async (commentId: number) => {
    if (token) {
      try {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );

        setFilteredComments((prevFilteredComments) =>
          prevFilteredComments.filter((comment) => comment.id !== commentId)
        );

        await deleteComment({ commentId, token });
        router.refresh();
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

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
          <CommentCard
            key={comment.id}
            {...comment}
            onDelete={handleDeleteComment}
          />
        ))
      ) : (
        <div className="text-center text-gray-500">
          No hay comentarios que mostrar
        </div>
      )}
    </div>
  );
};
