interface Props {
  commentId: number;
  token: string;
}

export const deleteComment = async ({ commentId, token }: Props) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/delete-user-comment/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error actualizando el estado del comentario:", error);
    throw error;
  }
};
