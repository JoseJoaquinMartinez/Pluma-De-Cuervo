export const getContactMessages = async (token: string) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact/get-mensages`;
  try {
    const response = await fetch(URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.messages || [];
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
