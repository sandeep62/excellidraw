"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  size?: "small" | "big";
}

export const Button = ({ children, onClick, className = "", size }: ButtonProps) => {
  const sizeClass = size === "big" ? "w-32 h-12 text-lg" : "w-20 h-8 text-sm";

  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition ${sizeClass} ${className}`}
    >
      {children}
    </button>
  );
};
