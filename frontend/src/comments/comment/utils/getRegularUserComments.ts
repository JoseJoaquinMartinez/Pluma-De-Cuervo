import { Comment, Comments } from "@/comments/data/comment";

export const getRegularUserComments = async (
  token: string
): Promise<Comments> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/get-comment-by-regularUser`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.comments || data.comments.length === 0) {
      return { comments: [] };
    }

    // Declaramos que data.comments es un array de Comment
    const rawComments: Comment[] = data.comments;

    // Definimos un tipo que extiende Comment y garantiza que 'replies' siempre existe.
    type ExtendedComment = Comment & { replies: Comment[] };

    // Convertir fechas y asegurarnos de que replies esté definido
    const formattedComments: ExtendedComment[] = rawComments.map(
      (comment: Comment) => ({
        ...comment,
        createdAt: new Date(comment.createdAt).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        replies: [], // Se asigna siempre un array vacío para replies
        user: getUserInfo(comment), // Agregar información del usuario
      })
    );

    // Creamos un mapa para acceder a los comentarios por su ID rápidamente
    const commentMap: { [key: number]: ExtendedComment } = {};
    formattedComments.forEach((comment: ExtendedComment) => {
      commentMap[comment.id] = comment;
    });

    // Construir la estructura jerárquica
    const rootComments: ExtendedComment[] = [];
    formattedComments.forEach((comment: ExtendedComment) => {
      if (comment.parentCommentId) {
        const parent = commentMap[comment.parentCommentId];
        if (parent) {
          if (!parent.replies) {
            parent.replies = [];
          }
          parent.replies.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
    });

    return { comments: rootComments };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return { comments: [] };
  }
};
// Función para obtener la información del usuario
function getUserInfo(
  comment: Comment
): { userName: string; email: string } | undefined {
  if (comment.regularUserData) {
    return {
      userName: comment.regularUserData.userName,
      email: comment.regularUserData.regularUser.email,
    };
  }
  if (comment.adminUserData) {
    return {
      userName: comment.adminUserData.adminUser.email.split("@")[0], // Usar el nombre antes del @ como nombre de usuario
      email: comment.adminUserData.adminUser.email,
    };
  }
  return undefined;
}
