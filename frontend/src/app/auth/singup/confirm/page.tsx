"use client";

import React, { Suspense } from "react";
import RegistrationComponent from "@/app/authComponents/singup/RegistrationComponent";
import { useSearchParams } from "next/navigation";
import { BookLoaderComponent } from "@/components/shared/BookLoader";

function TokenHandler() {
  const params = useSearchParams();
  const token = params?.get("token");

  if (!token) {
    return (
      <p className="text-mainText text-xl">
        Token no encontrado. Por favor, verifica tu enlace.
      </p>
    );
  }

  return <RegistrationComponent token={token} />;
}

export default function SingUpConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center w-full">
          <BookLoaderComponent />
        </div>
      }
    >
      <section className="flex flex-col items-center justify-center">
        <TokenHandler />
      </section>
    </Suspense>
  );
}
