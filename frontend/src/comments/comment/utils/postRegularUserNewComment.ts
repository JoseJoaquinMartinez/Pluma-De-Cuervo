interface Props {
  paragraphId: number;
  comment: string;
  token: string | null;
}

export const postRegularUserNewComment = async ({
  paragraphId,
  comment,
  token,
}: Props) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/post-comment-regular-user/${paragraphId}`;
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ commentBody: comment }),
    });
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
};
