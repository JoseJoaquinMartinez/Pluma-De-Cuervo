export interface OtherWorkButton {
  id: number;
  text: string;
  link: string;
  otherWorkId: number;
}

export interface OtherWorkComponentProps {
  id: number;
  title: string;
  workText: string;
  imagen: string;
  buttons: OtherWorkButton[];
}
