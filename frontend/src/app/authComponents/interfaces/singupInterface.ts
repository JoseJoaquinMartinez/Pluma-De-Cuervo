export interface SingUpInterface {
  label: string;
  type: string;
  name: string;
  placeHolder: string;
}

export interface UnderlineText {
  text: string;
  link: string;
}

export interface SingUpResponse {
  message: string;
}

export interface NewUserInterface {
  user: User;
  token: string;
  message: string;
}

export interface User {
  id: number;
  email: string;
  role: string;
  regularUserData: RegularUserDaum[];
}

export interface RegularUserDaum {
  id: number;
  userName: string;
  imagen: string | null;
  regularUserId: number;
}
