import Link from "next/link";
import Logo from "../Logo";
import NavMobileButton from "./NavMobileButton";

export default function Navbar() {
  return (
    <nav className="bg-navFoot w-full z-20 top-0 start-0 border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Logo />
          <span
            className={`self-center text-sm md:text-2xl font-semibold whitespace-nowrap`}
            style={{ fontFamily: "Mystery Quest" }}
          >
            Pluma de Cuervo
          </span>
        </Link>
        <NavMobileButton />
      </div>
    </nav>
  );
}
