"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getUserCommentsByAdmin } from "./utils/adminGetUserComments";
import { Comments } from "../data/comment";
import { CommentCard } from "../components/CommentCard";

export const AdminGetComment = () => {
  const [comments, setComments] = useState<Comments>({ comments: [] });
  const { token } = useSelector((state: RootState) => state.Authentication);

  useEffect(() => {
    const fetchComments = async () => {
      if (token) {
        const fetchedComments = await getUserCommentsByAdmin(token);
        setComments(fetchedComments);
      }
    };

    fetchComments();
  }, [token]);

  return (
    <div className="w-full">
      {comments.comments.length > 0 ? (
        comments.comments.map((comment) => (
          <CommentCard key={comment.id} {...comment} />
        ))
      ) : (
        <div>No hay comentarios</div>
      )}
    </div>
  );
};
