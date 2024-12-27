"use client";

import React, { useMemo, useState } from "react";
import { FormField } from "./FormFieldComponent";
import {
  SingUpInterface,
  UnderlineText,
} from "../../interfaces/singupInterface";
import { ButtonProps } from "@/components/interfaces/interfaz";
import MainButton from "@/components/shared/mainButton";
import Link from "next/link";
import { form } from "framer-motion/client";

interface FormComponentProps {
  formFieldsData: Array<SingUpInterface | ButtonProps | UnderlineText>;
  title: string;
}
interface FormFieldProps {
  [key: string]: string;
}

export const FormComponent: React.FC<FormComponentProps> = ({
  title,
  formFieldsData,
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

  const [form, setForm] = useState<FormFieldProps>(formElements);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-cardsBackground p-6 rounded-lg shadow-md max-w-lg mx-auto flex flex-col"
    >
      <h2 className=" text-xl md:text-2xl font-semibold text-center mb-6 text-encabezados uppercase">
        {title}
      </h2>
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
            <MainButton type={field.type} name={field.name} />
          </div>
        )
      )}
    </form>
  );
};
