import { Comment, Comments } from "@/comments/data/comment";

export const getUserCommentsByAdmin = async (
  token: string
): Promise<Comments> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/get-comments-by-admin`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.comments.length === 0) {
      return { comments: [] };
    }

    const adjustedComments = data.comments.map((comment: Comment) => ({
      ...comment,
      createdAt: new Date(comment.createdAt).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    }));

    return { comments: adjustedComments };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return { comments: [] };
  }
};
