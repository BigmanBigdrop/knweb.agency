"use client";

import React, { useState, useEffect } from "react";
import { validateEmail } from "@/lib/helpers";

interface ValidationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  validationType?: "email" | "required" | "minLength";
  minLength?: number;
  showValidation?: boolean;
  errorMessage?: string;
}

export const ValidationInput: React.FC<ValidationInputProps> = ({
  label,
  validationType = "required",
  minLength = 2,
  showValidation = true,
  errorMessage,
  className = "",
  ...props
}) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [touched, setTouched] = useState(false);

  const validateInput = (value: string) => {
    if (!touched) return null;

    switch (validationType) {
      case "email":
        return validateEmail(value);
      case "required":
        return value.trim().length > 0;
      case "minLength":
        return value.trim().length >= minLength;
      default:
        return true;
    }
  };

  useEffect(() => {
    if (props.value) {
      setIsValid(validateInput(props.value as string));
    }
  }, [props.value, touched, validationType, minLength]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    setIsValid(validateInput(e.target.value));
    props.onBlur?.(e);
  };

  const getBorderColor = () => {
    if (!showValidation || !touched) return "border-white/10";
    if (isValid === null) return "border-white/10";
    return isValid ? "border-green-500/50" : "border-red-500/50";
  };

  const getRingColor = () => {
    if (!showValidation || !touched) return "focus:ring-purple-500/50";
    if (isValid === null) return "focus:ring-purple-500/50";
    return isValid ? "focus:ring-green-500/50" : "focus:ring-red-500/50";
  };

  return (
    <div className="group">
      <label
        htmlFor={props.id}
        className="block text-sm font-semibold text-gray-300 mb-3 group-focus-within:text-purple-400 transition-colors"
      >
        {label} {props.required && "*"}
      </label>
      <div className="relative">
        <input
          {...props}
          onBlur={handleBlur}
          className={`w-full px-6 py-4 bg-white/5 border ${getBorderColor()} rounded-xl focus:ring-2 ${getRingColor()} focus:border-purple-500/50 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 ${className}`}
        />
        {showValidation && touched && isValid === false && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )}
        {showValidation && touched && isValid === true && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
      </div>
      {showValidation && touched && isValid === false && errorMessage && (
        <p className="mt-2 text-sm text-red-400">{errorMessage}</p>
      )}
    </div>
  );
};
