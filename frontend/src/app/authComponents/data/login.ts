import {
  SingUpInterface,
  UnderlineText,
} from "./../interfaces/singupInterface";
import { ButtonProps } from "@/components/interfaces/interfaz";

export type LoginFields = Array<SingUpInterface | ButtonProps | UnderlineText>;

export const LOGINFIELDS = [
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
    ...({ name: "Iniciar sesión", type: "submit" } as ButtonProps),
  },
  {
    text: "¿No tienes una cuenta? Regístrate",
    link: "/auth/singup",
  },
];
