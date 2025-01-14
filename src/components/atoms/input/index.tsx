import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  touched?: boolean;
}

export const TextInput = ({ label, className, error, touched, ...props }: InputProps) => {
  return (
    <div className="flex w-1/2 flex-col items-start justify-start">
      <label className="font-bold text-[14px] pb-2">{label}</label>
      <input
        type="text"
        className={`w-full border-[1px] border-[#333] px-4 py-2 text-[16px] rounded-md sm:text-[14px] ${className}`}
        {...props}
      />
      {touched && error ? (
        <div className="text-red-500 text-xs">
          {error}
        </div>
      ) : null}
    </div>
  );
};