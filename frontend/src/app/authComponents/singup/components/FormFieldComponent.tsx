import React from "react";

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  placeHolder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  name,
  placeHolder,
  onChange,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="text-encabezados mb-2 md:text-xl">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeHolder}
        onChange={onChange}
        className="border border-encabezados/50 text-mainText md:text-xl  rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-encabezados"
      />
    </div>
  );
};
