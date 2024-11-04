import Link from "next/link";
import type { ButtonProps } from "../interfaces/interfaz";

//TODO ADD ONCLICK FUNCTIONALITY
export default function MainButton({
  link,
  name,
  target,
  rel,
  type,
}: ButtonProps) {
  return link ? (
    <button
      type={type}
      className="text-white focus:ring-4 font-medium rounded-lg text-sm md:text-xl px-4 py-2 text-center bg-botones hover:bg-botones/70 focus:ring-botones/20"
    >
      <Link href={link} target={target} rel={rel}>
        {name}
      </Link>
    </button>
  ) : (
    <button
      type={type}
      className="text-white focus:ring-4 font-medium rounded-lg text-sm md:text-xl px-4 py-2 text-center bg-botones hover:bg-botones/70 focus:ring-botones/20"
    >
      {name}
    </button>
  );
}
