"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem("cookiesAccepted");
    if (!hasAcceptedCookies) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-navFoot text-whiteText p-4 text-center z-50">
      <p className="mb-2">
        Utilizamos cookies propias y de terceros para mejorar tu experiencia.{" "}
        <Link
          href="/politica-cookies"
          className="text-botones underline hover:text-navBarActiveLink transition-colors"
        >
          Más información
        </Link>
      </p>
      <button
        onClick={handleAcceptCookies}
        className="bg-botones px-4 py-2 rounded-md hover:bg-botonesSecundarios transition-colors"
      >
        Aceptar
      </button>
    </div>
  );
};

export default CookieBanner;
