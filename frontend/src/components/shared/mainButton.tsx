import Link from "next/link";
import type { ButtonProps } from "../interfaces/interfaz";

//TODO ADD ONCLICK FUNCTIONALITY
export default function MainButton({ link, name }: ButtonProps) {
  return link ? (
    <button
      type="button"
      className="text-white focus:ring-4 font-medium rounded-lg text-sm md:text-xl px-4 py-2 text-center bg-encabezados hover:bg-encabezados/70 focus:ring-encabezados/20"
    >
      <Link href={link}>{name}</Link>
    </button>
  ) : (
    <button
      type="button"
      className="text-white focus:ring-4 font-medium rounded-lg text-sm md:text-xl px-4 py-2 text-center bg-encabezados hover:bg-encabezados/70 focus:ring-encabezados/20"
    >
      {name}
    </button>
  );
}
