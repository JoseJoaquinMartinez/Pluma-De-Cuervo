"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookiePreferences = localStorage.getItem("cookiePreferences");
    if (!cookiePreferences) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify({
        necessary: true,
      })
    );

    setShowBanner(false);
  };

  /* const handleRejectNonEssential = () => {
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify({
        necessary: true,
        analytics: false,
      })
    );

    setShowBanner(false);
  };
 */
  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-navFoot text-whiteText p-4 text-center z-50">
      <p className="mb-2">
        Utilizamos cookies propias necesarias para el funcionamiento del sitio.
        {` `}
        <Link
          href="/politica-cookies"
          className="text-whiteText underline hover:text-encabezados transition-colors"
        >
          Más información
        </Link>
      </p>
      <div className="space-x-4">
        <button
          onClick={handleAcceptAll}
          className="bg-botones px-4 py-2 rounded-md hover:bg-botonesSecundarios transition-colors"
        >
          Aceptar Cookies
        </button>
        {/*  <button
          onClick={handleRejectNonEssential}
          className="bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          Solo necesarias
        </button> */}
      </div>
    </div>
  );
};

export default CookieBanner;
