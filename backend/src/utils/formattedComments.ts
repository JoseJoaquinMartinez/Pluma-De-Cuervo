import { FormattedComment } from "../types";

export function formattedComments(userComments: FormattedComment[]) {
  return userComments.map((comment) => ({
    id: comment.id,
    createdAt: comment.createdAt,
    commentBody: comment.commentBody,
    paragraph: {
      id: comment.paragraph.id,
      text: comment.paragraph.paragraphText,
      chapter: comment.paragraph.chapter.title,
      book: comment.paragraph.chapter.book.title,
    },
    user: {
      userName: comment.regularUserData?.userName || "Anónimo",
      imagen: comment.regularUserData?.imagen || null,
    },
    hasAdminResponse: comment.replies && comment.replies.length > 0,
    adminResponse:
      comment.replies && comment.replies.length > 0
        ? {
            id: comment.replies[0].id,
            responseBody: comment.replies[0].commentBody,
            adminUserId: comment.replies[0].adminUserData?.id || null,
          }
        : null,
  }));
}
