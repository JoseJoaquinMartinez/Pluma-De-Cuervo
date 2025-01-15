"use client";
import React, { useEffect, useState } from "react";
import { ChapterProps } from "../chapter/interface/chapter";
import { MessageCircle } from "lucide-react";
import { CommentModal, CommentSubmitProps } from "./CommentModal";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

import type {
  UpdatedUserCommentProps,
  UserComments,
} from "../chapter/interface/comments";
import { getUserCommentsOnChapter } from "@/comments/comment/utils/getUserCommentsOnChapter";

export const ChapterReadArea = ({ ...chapter }: ChapterProps) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [newComment, setNewComment] = useState<CommentSubmitProps>({
    paragraphId: null,
    newComment: "",
    commentId: null,
  });
  const { token, isLoggedIn } = useSelector(
    (state: RootState) => state.Authentication
  );

  const [updatedUserComments, setUpdatedUserComments] = useState<
    UpdatedUserCommentProps[]
  >([]);

  const handleOpenComment = (id: number) => {
    const existingComment = updatedUserComments.find(
      (comment) => comment.paragraphId === id
    );

    setNewComment({
      paragraphId: id,
      newComment: existingComment ? existingComment.commentBody : "",
      commentId: existingComment ? existingComment.id : null,
    });

    setIsCommentOpen(!isCommentOpen);
  };
  useEffect(() => {
    const chapterId = chapter.id;
    if (token) {
      const fetchUserComments = getUserCommentsOnChapter({
        chapterId,
        token,
      }).then((response) => {
        const simplifiedComments = response.map((comment: UserComments[0]) => ({
          id: comment.id,
          paragraphId: comment.paragraphId,
          commentBody: comment.commentBody,
        }));

        setUpdatedUserComments(simplifiedComments);
      });
    }
  }, [chapter.id, token]);

  const closeModalOnOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "modal-overlay") {
      setIsCommentOpen(false);
    }
  };

  return (
    <div className="bg-cardsBackground rounded-lg px-3 md:p-4 mt-2">
      {isLoggedIn && isCommentOpen && (
        <CommentModal
          closeModalOnOverlayClick={closeModalOnOverlayClick}
          setNewComment={setNewComment}
          newComment={newComment.newComment}
          commentId={newComment.commentId}
          paragraphId={newComment.paragraphId}
          setIsCommentOpen={setIsCommentOpen}
          token={token}
          setUpdatedUserComments={setUpdatedUserComments}
          updatedUserComments={updatedUserComments}
        />
      )}

      {chapter.paragraph.map(
        ({ id, paragraphNumber, paragraphText, paragraphType }) => {
          const hasComment = updatedUserComments.some(
            (comment) => comment.paragraphId === id
          );

          if (paragraphType === "paragraph") {
            return (
              <div className="flex flex-col" key={id}>
                {isLoggedIn && hasComment && (
                  <span
                    className="self-end text-2xl md:text-3xl text-encabezados"
                    onClick={() => handleOpenComment(id)}
                  >
                    <MessageCircle />
                  </span>
                )}
                <p
                  className="text-mainText mb-4"
                  dangerouslySetInnerHTML={{ __html: paragraphText }}
                  onClick={() => handleOpenComment(id)}
                />
              </div>
            );
          }

          if (paragraphType === "table") {
            const parser = new DOMParser();
            const tableDoc = parser.parseFromString(paragraphText, "text/html");
            const rows = Array.from(tableDoc.querySelectorAll("tr"));

            return (
              <div
                className="flex flex-col text-xs md:text-base items-center justify-center"
                key={id}
              >
                {isLoggedIn && hasComment && (
                  <span
                    className="self-end text-2xl md:text-3xl text-encabezados"
                    onClick={() => handleOpenComment(id)}
                  >
                    <MessageCircle />
                  </span>
                )}
                <div onClick={() => handleOpenComment(id)}>
                  <table className="table-auto mb-4 border-collapse text-mainText border border-gray-300">
                    <tbody>
                      {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {Array.from(row.querySelectorAll("td, th")).map(
                            (cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                className="border border-gray-400 px-4 py-2 text-left"
                                dangerouslySetInnerHTML={{
                                  __html: cell.innerHTML,
                                }}
                              />
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          }

          return null;
        }
      )}
    </div>
  );
};
