interface Props {
  commentId: number;
  token: string;
}

export const deleteUserComment = async ({ commentId, token }: Props) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/delete-regular-user-comment/${commentId}`;

  try {
    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === 204) {
      return true;
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error al eliminar el comentario:", error);
    return { error: "Error al eliminar el comentario" };
  }
};
