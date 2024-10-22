import Image from "next/image";
import logo from "../../public/logo-no-background.webp";

export default function Logo() {
  return <Image src={logo} width={60} alt="Pluma de Cuervo logo" />;
}
