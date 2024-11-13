import { ContactFormProps } from "../interfaces/contact";

export const postNewContactMessage = async ({
  email,
  message,
}: ContactFormProps) => {
  const newMessageSent = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL);
};
