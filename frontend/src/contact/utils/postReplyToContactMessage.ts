interface IPostReplyToContactMessage {
  email: string;
  replyMessage: string;
  token: string;
}

export const postReplyToContactMessage = async ({
  email,
  replyMessage,
  token,
}: IPostReplyToContactMessage) => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/contact/send-reply-to-message/${email}`;
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ replyMessage }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
