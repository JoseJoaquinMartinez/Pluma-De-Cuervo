interface Props {
  commentId: number;
  commentBody: string;
  token: string;
}

export const postRegularUserReplyToComment = async ({
  commentId,
  commentBody,
  token,
}: Props) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/post-reply-to-admin/${commentId}`;
  try {
    const sendResponse = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ commentBody: commentBody }),
    });
    if (!sendResponse.ok) {
      throw new Error(`HTTP error! status: ${sendResponse.status}`);
    }
    return sendResponse.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
