import { FormattedComment } from "@/comments/components/CommentCard";
import { Comment } from "@/comments/data/comment";

export const formatCommentRegularUser = (
  comment: Comment,
  parentParagraph?: FormattedComment["paragraph"]
): FormattedComment => {
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

  // Si el comentario tiene su propio párrafo, se usa; de lo contrario,
  // se utiliza el párrafo del padre (y usamos el operador ! para indicar
  // que estamos seguros de que existe).
  const paragraphData = comment.paragraph
    ? {
        id: comment.paragraph.id,
        paragraphText: comment.paragraph.paragraphText,
        chapter: {
          title: comment.paragraph.chapter.title,
          book: {
            title: comment.paragraph.chapter.book.title,
          },
        },
      }
    : parentParagraph!;

  return {
    id: comment.id,
    createdAt: new Date(comment.createdAt).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    commentBody: comment.commentBody,
    read: comment.read,
    paragraph: paragraphData,
    user,
    replies: (comment.replies || []).map((reply) =>
      formatCommentRegularUser(reply, paragraphData)
    ),
  };
};
