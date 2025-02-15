"use client";
import React from "react";
import { FormComponent } from "../components/FormComponent";
import { LOGINFIELDS } from "../data/login";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { AuthProps } from "../data/singup";
import { fetchLoginUser } from "@/store/slices/auth/login/thunk/fetchLogin";

const link = "/";

export const LoginComponent = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    data: message,
    error,
    loading,
  } = useSelector((state: RootState) => state.Authentication);

  const handleLoginUser = async ({ email, password }: AuthProps) => {
    return await dispatch(fetchLoginUser({ email, password }));
  };

  return (
    <FormComponent
      title={"Inicia sesión"}
      formFieldsData={LOGINFIELDS}
      state={message}
      error={error}
      loading={loading}
      link={link}
      dispatch={handleLoginUser}
      confirmationEmail={false}
    />
  );
};
