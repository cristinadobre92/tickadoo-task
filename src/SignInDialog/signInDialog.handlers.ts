import { login, register, refreshToken, testApi } from "../authApi.ts";
import { signInDialogTexts as t } from "./signInDialog.texts.ts";

export async function handleSubmitHelper({
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
}) {
    e.preventDefault();
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError(t.validEmail);
        return;
    }
    if (password.length < 8) {
        setError(t.validPassword);
        return;
    }
    setLoading(true);
    try {
        let data: { accessToken: string; refreshToken: string; };
        if (mode === "signIn") {
            data = await login(email, password);
            onAuthSuccess(data);
        } else {
            data = await register(email, password);
            setRegisterSuccess(true);
            setEmail("");
            setPassword("");
            setTimeout(() => {
                setRegisterSuccess(false);
                setMode("signIn");
            }, 1500);
        }
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
}

export async function handleTestHelper({
    accessToken,
    setTestResult,
    refreshTokenValue,
    setAccessToken,
    setRefreshTokenValue,
}) {
    setTestResult("");
    try {
        const res = await testApi(accessToken);
        if (res.status === 401) {
            const data = await refreshToken(refreshTokenValue);
            setAccessToken(data.accessToken);
            setRefreshTokenValue(data.refreshToken);
            setTestResult("Token refreshed. Try again.");
        } else if (res.ok) {
            setTestResult("API call successful! Token is valid.");
        } else {
            setTestResult("API call failed.");
        }
    } catch (err) {
        setTestResult(err.message);
    }
}