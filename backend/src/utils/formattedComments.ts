/* import { FormattedComment } from "../types";

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
    // Asignamos la información del usuario según qué relación exista
    user: comment.regularUserData
      ? {
          userName: comment.regularUserData.userName || "Anónimo",
          email: comment.regularUserData.regularUser?.email || null,
          imagen: comment.regularUserData.imagen || null,
        }
      : comment.adminUserData
        ? {
            userName: "Administrador", // O si deseas mostrar otro valor
            email: comment.adminUserData.adminUser?.email || null,
            imagen: null,
          }
        : { userName: "Desconocido", email: null, imagen: null },
    replies:
      comment.replies?.map((reply: FormattedComment["replies"][number]) => ({
        id: reply.id,
        commentBody: reply.commentBody,
        // En este ejemplo, para cada reply podrías aplicar la misma lógica, o bien formatearlos de otra forma
        adminUserData: reply.adminUserData || null,
      })) || [],
  }));
}
 */
