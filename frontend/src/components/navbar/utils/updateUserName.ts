interface Props {
  token: string;
  id: number;
  newName: string;
}
export const updateUserName = async ({ token, id, newName }: Props) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update-name/${id}`;
  try {
    const response = await fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newName }),
    });
    if (!response.ok) {
      throw new Error("Error actualizando el nombre");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error actualizando el nombre");
  }
};
