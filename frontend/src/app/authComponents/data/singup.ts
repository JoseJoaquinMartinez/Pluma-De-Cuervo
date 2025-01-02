import { ButtonProps } from "@/components/interfaces/interfaz";
import { SingUpInterface, UnderlineText } from "../interfaces/singupInterface";

export type SingUpFields = Array<SingUpInterface | ButtonProps | UnderlineText>;

export const SINGUPFIELDS: SingUpFields = [
  {
    label: "Email",
    type: "email",
    name: "email",
    placeHolder: "Email",
  },
  {
    label: "Contraseña",
    type: "password",
    name: "password",
    placeHolder: "Contraseña",
  },
  {
    label: "Confirmar contraseña",
    type: "password",
    name: "confirmPassword",
    placeHolder: "Confirmar contraseña",
  },
  {
    name: "Registrarse",
    type: "submit",
    link: "/auth/singup/validación-email",
  },
  {
    text: "¿Ya tienes una cuenta? Inicia sesión",
    link: "/auth/login",
  },
];
export interface AuthProps {
  email: string;
  password: string;
}