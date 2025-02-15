import { Comment } from "@/comments/data/comment";

export const updateCommentRead = async (
  id: number,
  read: boolean,
  token: string
): Promise<Comment> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/update-comment-read/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ read }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { updatedComment } = await response.json();
    return updatedComment;
  } catch (error) {
    console.error("Error actualizando el estado del comentario:", error);
    throw error;
  }
};
