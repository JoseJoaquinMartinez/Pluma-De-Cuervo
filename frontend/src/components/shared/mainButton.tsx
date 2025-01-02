import Link from "next/link";
import type { ButtonProps } from "../interfaces/interfaz";

export default function MainButton({
                                     link,
                                     name,
                                     target,
                                     rel,
                                     type,
                                     disabled,
                                   }: ButtonProps) {
  const buttonClasses = `text-white focus:ring-4 font-medium rounded-lg text-sm md:text-xl px-4 py-2 text-center ${
      disabled ? "bg-botones/50 cursor-not-allowed" : "bg-botones hover:bg-botones/70 focus:ring-botones/20"
  }`;

  return link ? (
      <Link
          href={disabled ? "#" : link}
          target={target}
          rel={rel}
          className={`${buttonClasses} inline-block`}
          aria-disabled={disabled}
      >
        {name}
      </Link>
  ) : (
      <button
          type={type}
          className={buttonClasses}
          disabled={disabled}
      >
        {name}
      </button>
  );
}
