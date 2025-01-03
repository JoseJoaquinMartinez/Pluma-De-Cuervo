"use client";
import React from "react";
import RegistrationComponent from "@/app/authComponents/singup/RegistrationComponent";
import { useSearchParams } from "next/navigation";

export default function SingUpConfirmationPage() {
  const params = useSearchParams();
  const token = params.get("token");

  if (token) {
    return (
      <section className="flex flex-col items-center justify-center ">
        <RegistrationComponent token={token} />
      </section>
    );
  }
}
