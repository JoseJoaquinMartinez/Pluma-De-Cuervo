"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { jwtDecode } from "jwt-decode";

import { fetchCreateNewUser } from "@/store/slices/auth/singup/thunk/fetchCreateNewUser";
import { fetchLoginUser } from "@/store/slices/auth/login/thunk/fetchLogin";

import { AlertCircle, UserCheck } from "lucide-react";

import MainButton from "@/components/shared/mainButton";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import { useRouter } from "next/navigation";

interface DecodedToken {
  email: string;
  password: string;
  iat: number;
  exp: number;
}

const RegistrationComponent = ({ token }: { token: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading } = useSelector(
    (state: RootState) => state.CreateNewUser
  );
  const hasDispatched = useRef(false);

  const router = useRouter();
  const { email, password } = useMemo(() => {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return { email: decodedToken.email, password: decodedToken.password };
  }, [token]);

  useEffect(() => {
    if (!hasDispatched.current) {
      hasDispatched.current = true;
      dispatch(fetchCreateNewUser(token)).then(() => {
        dispatch(fetchLoginUser({ email, password })).then(() => {
          router.push("/");
        });
      });
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
