"use client";

import { useState } from "react";
import NavPaths from "./NavPaths";
import MainButton from "../shared/mainButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { logoutUser } from "@/store/slices/auth/authSlice";
import { useRouter } from "next/navigation";
import ChangeUserNameModal from "../shared/ChangeUserNameModal";

export default function NavHamburguerButtonAndPaths() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [showChangeName, setShowChangeName] = useState(false);
  const { isLoggedIn, data } = useSelector(
    (state: RootState) => state.Authentication
  );
  const router = useRouter();
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await fetch(`/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    dispatch(logoutUser());
    router.push("/");
  };

  const showChangeNameFunction = () => {
    setShowChangeName(!showChangeName);
  };
  return (
    <>
      <article className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        {isLoggedIn ? (
          <article className="items-center space-x-3 md:space-x-4 hidden md:flex">
            {data?.user?.role === "user" ? (
              <>
                <span
                  className="text-whiteText text-xl md:block hover:bg-encabezados/50 rounded-lg p-2 cursor-pointer relative group"
                  onClick={showChangeNameFunction}
                >
                  <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-navFoot text-whiteText text-sm p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 pointer-events-none">
                    Puedes cambiar el nombre de usuario haciendo click
                  </span>
                  {data?.user?.regularUserData[0].userName}
                </span>
                {showChangeName && (
                  <ChangeUserNameModal onClose={showChangeNameFunction} />
                )}
              </>
            ) : (
              <></>
            )}
            <MainButton
              link="#"
              name="Cerrar Sesión"
              onClick={handleLogout}
              type="button"
            />
          </article>
        ) : (
          <article className="items-center space-x-3 md:space-x-4 hidden md:flex">
            <MainButton link="/auth/singup" name="Registrar" type="button" />
            <MainButton
              link="/auth/login"
              name="Iniciar Sesión"
              type="button"
            />
          </article>
        )}
        <button
          onClick={toggleNavbar}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-botones focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-sticky"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </article>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } items-center justify-between w-full md:flex md:w-auto md:order-1`}
      >
        {data ? (
          <NavPaths
            toggleNavbar={toggleNavbar}
            isLoggedIn={isLoggedIn}
            handleLogOut={handleLogout}
            data={data}
          />
        ) : (
          <NavPaths
            toggleNavbar={toggleNavbar}
            isLoggedIn={isLoggedIn}
            handleLogOut={handleLogout}
          />
        )}
      </div>
    </>
  );
}
