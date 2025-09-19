import { useState } from "react";
import { SignInDialog } from "./SignInDialog/SignInDialog.tsx";
import { TestTokenDialog } from "./TestTokenDialog.tsx";
import { LogoutDialog } from "./LogoutDialog/LogoutDialog.jsx";
import { mainTexts } from "./main.texts.ts";
import "./main.css";

export default function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState(mainTexts.notAuthenticated);
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [refreshTokenValue, setRefreshTokenValue] = useState("");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const isAuthenticated = !!accessToken;

  const handleSignInClick = () => {
    if (isAuthenticated) {
      setShowLogoutDialog(true);
    } else {
      setIsSignInOpen(true);
    }
  };

  const handleCloseSignIn = () => {
    setIsSignInOpen(false);
  };

  const handleAuthSuccess = (response) => {
    setAuthStatus(
      `${mainTexts.authenticatedWithToken}${response.accessToken?.substring(0, 20)}...`
    );
    setAccessToken(response.accessToken);
    setRefreshTokenValue(response.refreshToken);
    setIsSignInOpen(false);
    setIsTestDialogOpen(true);
  };

  return (
    <div className="app">
      <h3>{mainTexts.status}: {authStatus}</h3>

      <button type="button" className="sign-in-button" onClick={handleSignInClick}>
        {isAuthenticated ? mainTexts.logout : mainTexts.signIn}
      </button>

      <SignInDialog
        isOpen={isSignInOpen}
        onClose={handleCloseSignIn}
        onAuthSuccess={handleAuthSuccess}
      />
      <TestTokenDialog
        isOpen={isTestDialogOpen}
        accessToken={accessToken}
        refreshTokenValue={refreshTokenValue}
        onClose={() => setIsTestDialogOpen(false)}
      />
      <LogoutDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
      />
    </div>
  );
}
