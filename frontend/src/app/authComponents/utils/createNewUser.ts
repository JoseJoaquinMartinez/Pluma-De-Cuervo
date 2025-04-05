export const createNewUser = async (token: string) => {
  const URL = `/api/auth/registration?token=${token}`;
  try {
    const response = await fetch(URL, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error creando el usuario");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error creando el usuario");
  }
};
