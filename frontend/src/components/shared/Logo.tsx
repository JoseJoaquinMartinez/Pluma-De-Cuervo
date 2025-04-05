import Image from "next/image";
import logo from "../../../public/logo-no-background.webp";

export default function Logo() {
  return (
    <>
      <Image
        src={logo}
        width={60}
        alt="Pluma de Cuervo logo"
        className="hover:drop-shadow-[0_0_10px_rgba(255,255,255,255.8)] transition-all duration-300"
      />
      <span
        className={`self-center text-2xl font-semibold whitespace-nowrap text-whiteText hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300`}
        style={{ fontFamily: "Mystery Quest" }}
      >
        Pluma de Cuervo
      </span>
    </>
  );
}
