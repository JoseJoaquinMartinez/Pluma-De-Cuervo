"use client";
import React, { useMemo, useState } from "react";
import { FormField } from "./FormFieldComponent";
import MainButton from "@/components/shared/mainButton";
import Link from "next/link";
import { EmailVerificationResponse } from "@/store/slices/auth/singup/thunk/fetchEmailVerification";
import { AuthProps, FormFieldData } from "@/app/authComponents/data/singup";
import { useRouter } from "next/navigation";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import ErrorToast from "@/components/shared/ErrorToaster";
// Importa el tipo unión

interface AsyncThunkActionResult {
  meta: { requestStatus: "fulfilled" | "rejected" };
  payload: unknown;
}

interface FormComponentProps {
  formFieldsData: FormFieldData[];
  title: string;
  state: EmailVerificationResponse | null;
  error: string | null;
  loading: boolean;
  link: string;
  dispatch: (props: AuthProps) => Promise<AsyncThunkActionResult>;
  confirmationEmail: boolean;
}

interface FormFieldValues {
  [key: string]: string;
}

export const FormComponent: React.FC<FormComponentProps> = ({
  title,
  formFieldsData,
  loading,
  link,
  dispatch,
  confirmationEmail,
}) => {
  const formElements = useMemo(() => {
    const inputs: FormFieldValues = {};
    formFieldsData.forEach((field) => {
      if ("label" in field) {
        inputs[field.name] = "";
      }
    });
    return inputs;
  }, [formFieldsData]);

  const router = useRouter();
  const [form, setForm] = useState<FormFieldValues>(formElements);
  const [errorState, setErrorState] = useState<string | null>(null);

  const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !form.email ||
      form.email.length < 2 ||
      !form.password ||
      form.password.length < 2
    ) {
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

    const resultAction = await dispatch({
      email: form.email,
      password: form.password,
    });

    if (resultAction.meta.requestStatus === "fulfilled") {
      router.push(link);
    } else {
      setErrorState(resultAction.payload as string);
      setTimeout(() => {
        setErrorState(null);
      }, 1000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <BookLoaderComponent />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-cardsBackground p-6 rounded-lg shadow-md max-w-lg mx-auto flex flex-col"
    >
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-6 text-encabezados uppercase">
        {title}
      </h2>
      {errorState && <ErrorToast message={errorState} />}
      {formFieldsData.map((field, index) => {
        if ("label" in field) {
          return (
            <FormField
              key={index}
              label={field.label}
              type={field.type}
              name={field.name}
              placeHolder={field.placeHolder || ""}
              onChange={handleChange}
            />
          );
        } else if ("text" in field) {
          return (
            <Link
              key={index}
              href={field.link}
              className="text-mainText/60 self-center mt-2 text-sm md:text-base hover:text-mainText transition-all"
            >
              {field.text}
            </Link>
          );
        } else {
          return (
            <div key={index} className="mt-6 self-center">
              <MainButton
                type={field.type as "submit" | "reset" | "button"}
                name={field.name}
                disabled={loading}
              />
            </div>
          );
        }
      })}
    </form>
  );
};
