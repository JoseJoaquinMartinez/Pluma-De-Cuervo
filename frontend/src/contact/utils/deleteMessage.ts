interface Props {
  messageId: number;
  token: string;
}
export const deleteContactMessage = async ({ messageId, token }: Props) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact/delete-contact-message/${messageId}`;
  try {
    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};
