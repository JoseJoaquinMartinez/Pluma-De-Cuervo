export interface ButtonProps {
  link?: string;
  name: string;
  rel?: string;
  target?: string;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  onClick?: () => void;
}
