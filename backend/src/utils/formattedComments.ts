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
    replies:
      comment.replies?.map((reply) => ({
        id: reply.id,
        commentBody: reply.commentBody,
        adminUserId: reply.adminUserData?.id || null,
      })) || [],
  }));
}
