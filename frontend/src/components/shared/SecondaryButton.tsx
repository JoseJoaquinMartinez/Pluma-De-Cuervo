import Link from "next/link";
import type { ButtonProps } from "../interfaces/interfaz";

export default function SecondaryButton({ link, name }: ButtonProps) {
  return (
    <button
      type="button"
      className="text-white focus:ring-4 font-medium rounded-lg text-sm md:text-xl px-4 py-2 text-center bg-botones hover:bg-botones/70 focus:ring-botones/20"
    >
      <Link href={link}>{name}</Link>
    </button>
  );
}
