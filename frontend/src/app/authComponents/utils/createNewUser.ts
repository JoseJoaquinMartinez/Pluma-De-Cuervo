export const createNewUser = async (token: string) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/registration?token=${token}`;
  try {
    const response = await fetch(URL);

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
