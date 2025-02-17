import { FormattedComment } from "@/comments/components/CommentCard";
import { Comment } from "@/comments/data/comment";

export const formatComment = (comment: Comment): FormattedComment => {
  const user =
    comment.regularUserData?.regularUser.email ||
    comment.adminUserData?.adminUser.email
      ? {
          userName:
            comment.regularUserData?.userName ||
            comment.adminUserData?.adminUser.email.split("@")[0] ||
            "Usuario Desconocido",
          email:
            comment.regularUserData?.regularUser.email ??
            comment.adminUserData?.adminUser.email ??
            null,
        }
      : undefined;

  return {
    id: comment.id,
    createdAt: comment.createdAt,
    commentBody: comment.commentBody,
    read: comment.read,
    paragraph: {
      id: comment.paragraph.id,
      paragraphText: comment.paragraph.paragraphText,
      chapter: {
        title: comment.paragraph.chapter.title,
        book: {
          title: comment.paragraph.chapter.book.title,
        },
      },
    },
    user,
    replies: (comment.replies || []).map((reply) => formatComment(reply)),
  };
};
