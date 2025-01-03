"use client";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCreateNewUser } from "@/store/slices/auth/singup/thunk/fetchCreateNewUser";
import MainButton from "@/components/shared/mainButton";
import { AlertCircle, UserCheck } from "lucide-react";

const RegistrationComponent = ({ token }: { token: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, error, loading } = useSelector(
    (state: RootState) => state.CreateNewUser
  );
  const hasDispatched = useRef(false);

  useEffect(() => {
    if (!hasDispatched.current) {
      dispatch(fetchCreateNewUser(token));
      hasDispatched.current = true;
    }
  }, [token]);

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
          <MainButton name={"Volver"} link={"/"} />
        </div>
      </article>
    </section>
  );
};

export default RegistrationComponent;
