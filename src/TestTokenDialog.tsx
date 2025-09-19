import React from "react";
import { signInDialogTexts as t } from "./SignInDialog/signInDialog.texts.ts";
import "./SignInDialog/signInDialog.css";
import { handleTestHelper } from "./SignInDialog/signInDialog.handlers.ts";

export function TestTokenDialog({ isOpen, accessToken, refreshTokenValue, userEmail, onClose }) {
  const [testResult, setTestResult] = React.useState("");

  const handleTest = () =>
    handleTestHelper({
      accessToken,
      setTestResult,
      refreshTokenValue,
      setAccessToken: () => {},
      setRefreshTokenValue: () => {},
    });

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="test-dialog-title"
      className="sign-in-dialog modal"
      tabIndex={-1}
    >
      <button
        aria-label={t.close}
        onClick={onClose}
        className="sign-in-dialog__close"
      >
        ×
      </button>
      <h2 id="test-dialog-title" className="sign-in-dialog__title">
        {t.testApiWithToken}
      </h2>
      <button
        type="button"
        onClick={handleTest}
        className="sign-in-dialog__test"
      >
        {t.testApiWithToken}
      </button>
      <div className="sign-in-dialog__result">{testResult}</div>
    </div>
  );
}