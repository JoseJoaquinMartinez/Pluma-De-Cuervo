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
    user: comment.regularUserData
      ? {
          userName: comment.regularUserData.userName || "Anónimo",
          email: comment.regularUserData.regularUser.email, // Ahora existe
          imagen: comment.regularUserData.imagen || null,
        }
      : comment.adminUserData
        ? {
            userName: "Administrador",
            email: comment.adminUserData.adminUser.email, // Ahora existe
            imagen: null,
          }
        : { userName: "Desconocido", email: null, imagen: null },
    replies:
      comment.replies?.map((reply) => ({
        id: reply.id,
        commentBody: reply.commentBody,
        // Puedes agregar más lógica si lo deseas para formatear el usuario del reply
        adminUserData: reply.adminUserData || null,
      })) || [],
  }));
}
