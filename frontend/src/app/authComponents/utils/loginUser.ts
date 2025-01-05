import { AuthProps } from "../data/singup";

const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`;

export const loginUser = async ({ email, password }: AuthProps) => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response) {
      throw new Error("Error iniciando sesión");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error iniciando sesión");
  }
};
