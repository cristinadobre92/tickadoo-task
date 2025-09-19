const API_BASE = "https://task.tickadoo.com/api/task";

export async function login(username: string, password: string) {
    const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Authentication failed.");
    return res.json();
}

export async function register(username: string, password: string) {
    const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Registration failed.");
    return res.json();
}

export async function refreshToken(refreshToken: string) {
    const res = await fetch(`${API_BASE}/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) throw new Error("Token refresh failed.");
    return res.json();
}

export async function testApi(accessToken: string) {
    const res = await fetch(`${API_BASE}/test`, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res;
}