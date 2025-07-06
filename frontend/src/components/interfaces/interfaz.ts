export interface ButtonProps {
  link?: string;
  name: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}
