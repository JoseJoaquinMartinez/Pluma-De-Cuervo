interface MarkContactMessageAsRead {
  id: number;
  token: string;
  isRead: boolean;
}
export const markContactMessageAsRead = async ({
  id,
  token,
  isRead,
}: MarkContactMessageAsRead): Promise<ContactMessage | string> => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact/update-contact-read/${id}`;
  try {
    const response = await fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isRead }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { updatedContact } = await response.json();
    return updatedContact;
  } catch (error) {
    console.error("Error actualizando el estado del comentario:", error);
    throw error;
  }
};
