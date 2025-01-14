import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  touched?: boolean;
  placeholder?: string;
}

export const TextInput = ({ label, className, error, touched, placeholder, ...props }: InputProps) => {
  return (
    <div className="mb-4 w-full">
      {label && (
        <label className="block text-[1rem] leading-[1rem] text-black mb-[0.625rem]">
          {label}
        </label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className={`w-full h-[50px] p-[3px_8px] text-[0.875rem] leading-[1.375rem] bg-white border border-solid border-[#a7abad] rounded-[5px] text-[#222] font-normal font-sans transition-all duration-200 ease-out focus:bg-white focus:border-[#51cbee] focus:shadow-[0_0_5px_#51cbee] focus:outline-none ${
          touched && error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {touched && error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};
