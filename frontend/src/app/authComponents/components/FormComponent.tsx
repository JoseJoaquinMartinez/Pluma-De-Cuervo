"use client";

import React, { useMemo, useState } from "react";

import { FormField } from "./FormFieldComponent";
import { SingUpInterface, UnderlineText } from "../interfaces/singupInterface";
import { ButtonProps } from "@/components/interfaces/interfaz";
import MainButton from "@/components/shared/mainButton";
import Link from "next/link";
import { EmailVerificationResponse } from "@/store/slices/auth/singup/thunk/fetchEmailVerification";
import { AuthProps } from "@/app/authComponents/data/singup";
import { useRouter } from "next/navigation";
import { BookLoaderComponent } from "@/components/shared/BookLoader";

interface LoginResponse {
  token: string;
  message: string;
}

type AuthResponse = LoginResponse | void;

interface FormComponentProps {
  formFieldsData: Array<SingUpInterface | ButtonProps | UnderlineText>;
  title: string;
  state: EmailVerificationResponse | null;
  error: string | null;
  loading: boolean;
  link: string;
  dispatch: (props: AuthProps) => AuthResponse;
  confirmationEmail: boolean;
}
interface FormFieldProps {
  [key: string]: string;
}

export const FormComponent: React.FC<FormComponentProps> = ({
  title,
  formFieldsData,
  state,
  error,
  loading,
  link,
  dispatch,
  confirmationEmail,
}) => {
  const formElements = useMemo(() => {
    const formFields: FormFieldProps = {};
    formFieldsData.forEach((field) => {
      if ("label" in field) {
        formFields[field.name] = "";
      }
    });
    return formFields;
  }, [formFieldsData]);
  const router = useRouter();
  const [form, setForm] = useState<FormFieldProps>(formElements);
  const [errorState, setErrorState] = useState<string | null>(null);

  const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.email.length < 2 || form.password.length < 2) {
      setErrorState("Por favor, rellena todos los campos");
      return;
    }

    if (confirmationEmail) {
      if (!isValidPassword(form.password)) {
        setErrorState(
          "La contraseña debe tener al menos 6 caracteres y contener letras y números."
        );
        return;
      }
      if (form.password === form.confirmPassword) {
        dispatch({ email: form.email, password: form.password });
        router.push(link);
        return;
      } else {
        setErrorState("Las contraseñas no coinciden");
        return;
      }
    }

    dispatch({ email: form.email, password: form.password });
    router.push(link);
    return;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <BookLoaderComponent />
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-red-500 text-center">
        <p>{error === "Network Error" ? "Error de conexión" : error}</p>
      </div>
    );
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-cardsBackground p-6 rounded-lg shadow-md max-w-lg mx-auto flex flex-col"
    >
      <h2 className=" text-xl md:text-2xl font-semibold text-center mb-6 text-encabezados uppercase">
        {title}
      </h2>
      <p>{errorState}</p>
      {formFieldsData.map((field, index) =>
        "label" in field ? (
          <FormField
            key={index}
            label={field.label}
            type={field.type}
            name={field.name}
            placeHolder={field.placeHolder}
            onChange={handleChange}
          />
        ) : "text" in field ? (
          <Link
            key={index}
            href={field.link}
            className="text-mainText/60 self-center mt-2 text-sm md:text-base hover:text-mainText transition-all"
          >
            {field.text}
          </Link>
        ) : (
          <div key={index} className="mt-6 self-center">
            <MainButton
              type={field.type}
              name={field.name}
              disabled={loading}
            />
          </div>
        )
      )}
    </form>
  );
};
