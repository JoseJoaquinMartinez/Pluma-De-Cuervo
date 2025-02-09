import Link from "next/link";
import Logo from "../shared/Logo";
import TiktokLogo from "./tiktokLogo";
import SecondaryButton from "../shared/SecondaryButton";

export default function Footer() {
  return (
    <div className="bg-navFoot w-full mt-10">
      <section className="max-w-screen-xl flex flex-col md:flex-row items-center justify-between h-auto mx-auto px-4 py-6">
        <Link href="/" className="flex items-center space-x-3">
          <Logo />
        </Link>
        <div className="flex justify-center items-center w-full md:w-auto my-4 md:my-0">
          <Link
            href="https://www.tiktok.com/@novelaxpalabras"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TiktokLogo width="50" height="50" />
          </Link>
        </div>
        <SecondaryButton link="/contact" name="Contacto" />
      </section>

      <article className="border-t border-whiteText mt-4">
        <section className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-center text-sm text-whiteText py-4 space-y-2 md:space-y-0 md:space-x-6">
          <Link href="/aviso-legal" className="hover:underline">
            Aviso Legal
          </Link>
          <span className="hidden md:block text-whiteText">|</span>
          <Link href="/politica-privacidad" className="hover:underline">
            Política de Privacidad
          </Link>
          <span className="hidden md:block text-whiteText">|</span>
          <Link href="/politica-cookies" className="hover:underline">
            Política de Cookies
          </Link>
        </section>
      </article>
    </div>
  );
}
