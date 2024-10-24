import Link from "next/link";
import Logo from "../shared/Logo";
import NavHamburguerButtonAndPaths from "./NavHamburguerButtonAndPaths";

export default function Navbar() {
  return (
    <nav className="bg-navFoot w-full">
      <section className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Logo />
        </Link>
        <NavHamburguerButtonAndPaths />
      </section>
    </nav>
  );
}
