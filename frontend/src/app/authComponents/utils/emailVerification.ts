import { EmailVerificationResponse } from "@/store/slices/auth/singup/thunk/fetchEmailVerification";

export interface EmailVerification {
  email: string;
  password: string;
}
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const BACKEND_EXTENSION = "/auth/verify-email";

export const emailVerification = async ({
  email,
  password,
}: EmailVerification): Promise<EmailVerificationResponse> => {
  const url = BACKEND_URL + BACKEND_EXTENSION;
  const data = { email, password };

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error en la verificación del correo electrónico");
  }
};
