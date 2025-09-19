import React, { useState, useEffect, useRef } from "react";
import { signInDialogTexts as t } from "./signInDialog.texts.ts";
import "./signInDialog.css";
import {
  handleSubmitHelper,
} from "./signInDialog.handlers.ts";
import { MainButton } from "../Components/MainButton.tsx";

export function SignInDialog({ isOpen, onClose, onAuthSuccess }) {
  const [mode, setMode] = useState<"signIn" | "register">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setError("");
      setLoading(false);
      setRegisterSuccess(false);
      setMode("signIn");
      dialogRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: { preventDefault: () => void }) =>
    handleSubmitHelper({
      e,
      mode,
      email,
      password,
      setError,
      setLoading,
      onAuthSuccess,
      setRegisterSuccess,
      setEmail,
      setPassword,
      setMode,
    });

  // Responsive: modal for desktop/tablet, drawer for mobile
  const isMobile = window.innerWidth < 600;

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-dialog-title"
      className={`sign-in-dialog ${isMobile ? "drawer" : "modal"}`}
      tabIndex={-1}
      ref={dialogRef}
    >
      <button
        aria-label={t.close}
        onClick={onClose}
        className="sign-in-dialog__close"
      >
        ×
      </button>
      <h2 id="auth-dialog-title" className="sign-in-dialog__title">
        {mode === "signIn" ? t.signIn : t.register}
      </h2>
      <form onSubmit={handleSubmit} aria-label={mode === "signIn" ? t.signInForm : t.registerForm}>
        <label htmlFor="email" className="sign-in-dialog__label">
          {t.email}
        </label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="sign-in-dialog__input"
        />
        <label htmlFor="password" className="sign-in-dialog__label">
          {t.password}
        </label>
        <input
          id="password"
          type="password"
          autoComplete={mode === "signIn" ? "current-password" : "new-password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="sign-in-dialog__input"
        />
          <button
            type="button"
            className="sign-in-dialog__switch"
            onClick={() => {
              setMode(mode === "signIn" ? "register" : "signIn");
              setError("");
              setEmail("");
              setPassword("");
            }}
          >
            {mode === "signIn" ? t.registerHere : t.alreadyHaveAccount}
          </button>
        
        {error && (
          <div role="alert" className="sign-in-dialog__error">
            {error}
          </div>
        )}
        {registerSuccess && mode === "register" && (
          <div className="sign-in-dialog__result" style={{ color: "#27AE60", textAlign: "center", marginBottom: 12 }}>
            {t.registrationSuccess}
          </div>
        )}
        <MainButton loading={loading} type="submit">
          {mode === "signIn" ? t.signIn : t.register}
        </MainButton>
      </form>
    </div>
  );
}