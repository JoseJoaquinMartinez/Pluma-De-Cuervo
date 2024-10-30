import Link from "next/link";
import Logo from "../shared/Logo";
import TiktokLogo from "./tiktokLogo";
import SecondaryButton from "../shared/SecondaryButton";

export default function Footer() {
  return (
    <div className="bg-navFoot w-full mt-10">
      <section className="max-w-screen-xl flex flex-col md:flex-row items-center justify-between h-auto mx-auto">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Logo />
        </Link>
        <Link
          href={"https://www.tiktok.com/@novelaxpalabras"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TiktokLogo width={"50"} height={"50"} />
        </Link>
        <article className="flex md:order-2 space-x-3 my-2 md:space-x-0 rtl:space-x-reverse ">
          <SecondaryButton link="/contact" name="Contacto" />
        </article>
      </section>
    </div>
  );
}
