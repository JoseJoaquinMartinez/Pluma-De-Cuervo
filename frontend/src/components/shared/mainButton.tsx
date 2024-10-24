import Link from "next/link";
import type { ButtonProps } from "../interfaces/interfaz";

export default function MainButton({ link, name }: ButtonProps) {
  return (
    <button
      type="button"
      className="text-white focus:ring-4 font-medium rounded-lg text-sm md:text-xl px-4 py-2 text-center bg-encabezados hover:bg-encabezados/70 focus:ring-encabezados/20"
    >
      <Link href={link}>{name}</Link>
    </button>
  );
}
