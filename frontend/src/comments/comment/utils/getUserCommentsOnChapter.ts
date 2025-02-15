interface GetUserCommentOnChapterProps {
  chapterId: number;
  token: string;
}

export const getUserCommentsOnChapter = async ({
  chapterId,
  token,
}: GetUserCommentOnChapterProps) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/get-user-comments-on-a-chapter/${chapterId}`;
  try {
    const response = await fetch(URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    if (error instanceof Error) return error.message;
    else throw new Error("Error inesperado obteniendo los comentarios");
  }
};
