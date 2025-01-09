"use client";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

import { fetchCreateNewUser } from "@/store/slices/auth/singup/thunk/fetchCreateNewUser";

import { AlertCircle, UserCheck } from "lucide-react";

import MainButton from "@/components/shared/mainButton";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import { useRouter } from "next/navigation";

const RegistrationComponent = ({ token }: { token: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading } = useSelector(
    (state: RootState) => state.Authentication
  );
  const hasDispatched = useRef(false);

  const router = useRouter();

  useEffect(() => {
    if (!hasDispatched.current) {
      hasDispatched.current = true;
      dispatch(fetchCreateNewUser(token));
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <BookLoaderComponent />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center">
        <AlertCircle size={50} />
        <p>{error}</p>
      </div>
    );
  }
  return (
    <section className="flex items-center justify-center bg-background mt-8 p-2">
      <article className="max-w-lg w-full bg-cardsBackground p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <UserCheck className="mx-auto h-16 w-16 text-encabezados" />
          <h2 className="mt-4 text-3xl font-bold text-encabezados">
            Usuario creado correctamente
          </h2>
        </div>
        <p className="text-mainText text-lg mb-4 text-center">
          Ahora puedes disfrutar de una experiencia más completa
        </p>

        <div className="mt-8 flex justify-center">
          <MainButton name={"Volver"} link={"/"} type="button" />
        </div>
      </article>
    </section>
  );
};

export default RegistrationComponent;
