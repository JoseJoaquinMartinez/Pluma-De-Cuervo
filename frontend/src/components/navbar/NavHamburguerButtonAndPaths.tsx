"use client";

import { useState } from "react";
import { navItems } from "./data/nav-items";
import Link from "next/link";
import NavPaths from "./NavPaths";

export default function NavHamburguerButtonAndPaths() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <article className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button
          type="button"
          className="text-white focus:ring-4 font-medium rounded-lg text-sm px-4 py-2 text-center bg-botones hover:bg-botones/70 focus:ring-botones/20"
        >
          Registrar
        </button>
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
      <article
        className={`${
          isOpen ? "block" : "hidden"
        } items-center justify-between w-full md:flex md:w-auto md:order-1`}
        id="navbar-sticky"
      >
        <NavPaths />
      </article>
    </>
  );
}
