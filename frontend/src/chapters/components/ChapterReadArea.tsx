"use client";
import React, { useEffect, useState } from "react";
import { ChapterProps } from "../chapter/interface/chapter";
import { MessageSquare } from "lucide-react";
import { CommentModal, CommentSubmitProps } from "./CommentModal";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

import type { UserComments } from "../chapter/interface/comments";
import { getUserCommentsOnChapter } from "@/comments/comment/utils/getUserCommentsOnChapter";

export const ChapterReadArea = ({ ...chapter }: ChapterProps) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [newComment, setNewComment] = useState<CommentSubmitProps>({
    paragraphId: null,
    newComment: "",
  });
  const { token, isLoggedIn } = useSelector(
    (state: RootState) => state.Authentication
  );
  const [userComments, setUserComments] = useState<UserComments>([]);
  const [updatedUserComments, setUpdatedUserComments] = useState<
    CommentSubmitProps[]
  >([]);

  const handleOpenComment = (id: number) => {
    setNewComment((prev) => ({
      ...prev,
      paragraphId: id,
    }));
    setIsCommentOpen(!isCommentOpen);
  };
  useEffect(() => {
    const chapterId = chapter.id;
    if (token) {
      const fetchUserComments = getUserCommentsOnChapter({
        chapterId,
        token,
      }).then((response) => {
        setUserComments(response);

        const simplifiedComments = response.map((comment: UserComments[0]) => ({
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
      <p>{JSON.stringify(updatedUserComments)}</p>
      {isCommentOpen && (
        <CommentModal
          closeModalOnOverlayClick={closeModalOnOverlayClick}
          setNewComment={setNewComment}
          newComment={newComment.newComment}
          paragraphId={newComment.paragraphId}
          setIsCommentOpen={setIsCommentOpen}
          token={token}
        />
      )}

      {chapter.paragraph.map(
        ({ id, paragraphNumber, paragraphText, paragraphType }) => {
          if (paragraphType === "paragraph") {
            return (
              <div className="flex flex-col" key={id}>
                <span
                  className="self-end text-2xl md:text-3xl text-encabezados"
                  onClick={() => handleOpenComment(id)}
                >
                  <MessageSquare />
                </span>
                <p
                  key={id}
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
                <span
                  className="self-end text-2xl md:text-3xl text-encabezados"
                  onClick={() => handleOpenComment(id)}
                >
                  <MessageSquare />
                </span>
                <div key={id} onClick={() => handleOpenComment(id)}>
                  <table
                    key={id}
                    className="table-auto mb-4 border-collapse text-mainText border border-gray-300"
                  >
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
