import React from "react";
import { mainTexts } from "../main.texts.ts";

interface MainButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export function MainButton({ loading = false, children, ...props }: MainButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`sign-in-dialog__submit ${props.className ?? ""}`}
    >
      {loading ? mainTexts.processing : children}
    </button>
  );
}