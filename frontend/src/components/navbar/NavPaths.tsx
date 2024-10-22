"use client";
import Link from "next/link";
import { navItems } from "./data/nav-items";
import { usePathname } from "next/navigation";

export default function NavPaths() {
  const currentPath = usePathname();

  return (
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
      {navItems.map((item) => (
        <li key={item.name}>
          <Link
            href={item.link}
            className={`block py-2 px-3 text-whiteText rounded md:p-0 ${
              currentPath === item.link ? "border-b-2 border-botones" : ""
            }`}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
