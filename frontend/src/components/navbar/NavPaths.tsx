"use client";
import Link from "next/link";
import { navItems, adminNavItems, regularNavItems } from "./data/nav-items";
import { usePathname } from "next/navigation";
import MainButton from "../shared/mainButton";
import { NewUserInterface } from "@/app/authComponents/interfaces/singupInterface";

interface NavPathProps {
  toggleNavbar: () => void;
  isLoggedIn: boolean;
  handleLogOut: () => void;
  data?: NewUserInterface;
}

export default function NavPaths({
  toggleNavbar,
  isLoggedIn,
  handleLogOut,
  data,
}: NavPathProps) {
  const currentPath = usePathname();

  return (
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
      {data?.user.role === "admin"
        ? adminNavItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.link}
                className={`block py-2 px-3 rounded md:p-0 md:text-2xl ${
                  currentPath === item.link
                    ? "border-b-2 border-navBarActiveLink text-navBarActiveLink transition-all duration-300"
                    : "text-whiteText"
                } `}
                onClick={toggleNavbar}
              >
                {item.name}
              </Link>
            </li>
          ))
        : data?.user.role === "user"
          ? regularNavItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.link}
                  className={`block py-2 px-3 rounded md:p-0 md:text-2xl ${
                    currentPath === item.link
                      ? "border-b-2 border-navBarActiveLink text-navBarActiveLink transition-all duration-300"
                      : "text-whiteText"
                  } `}
                  onClick={toggleNavbar}
                >
                  {item.name}
                </Link>
              </li>
            ))
          : navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.link}
                  className={`block py-2 px-3 rounded md:p-0 md:text-2xl ${
                    currentPath === item.link
                      ? "border-b-2 border-navBarActiveLink text-navBarActiveLink transition-all duration-300"
                      : "text-whiteText"
                  } `}
                  onClick={toggleNavbar}
                >
                  {item.name}
                </Link>
              </li>
            ))}
      {isLoggedIn ? (
        <li className="md:hidden">
          <MainButton
            link="#"
            name="Cerrar sesión"
            onClick={() => {
              handleLogOut();
              toggleNavbar();
            }}
          />
        </li>
      ) : (
        <>
          <li className="md:hidden">
            <MainButton
              link="/auth/singup"
              name="Registrar"
              onClick={toggleNavbar}
            />
          </li>
          <li className="md:hidden mt-2">
            <MainButton
              link="/auth/login"
              name="Iniciar Sesión"
              onClick={toggleNavbar}
            />
          </li>
        </>
      )}
    </ul>
  );
}
