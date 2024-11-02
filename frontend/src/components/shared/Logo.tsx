import Image from "next/image";
import logo from "../../../public/logo-no-background.webp";

export default function Logo() {
  return (
    <>
      <Image src={logo} width={60} alt="Pluma de Cuervo logo" />
      <span
        className={`self-center text-sm md:text-2xl font-semibold whitespace-nowrap text-whiteText`}
        style={{ fontFamily: "Mystery Quest" }}
      >
        Pluma de Cuervo
      </span>
    </>
  );
}
