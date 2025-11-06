// utils/auth.js

// Simulate login
export function mockLogin() {
    const token = "fake-jwt-" + Math.random().toString(36).substring(2, 10);
    const expiry = Date.now() + 1 * 60 * 1000; // expires in 1 minute
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiry", expiry.toString());
    return { token, expiry };
}

// Check if token is expired
export function isTokenExpired() {
    const expiry = parseInt(localStorage.getItem("tokenExpiry") || "0", 10);
    return Date.now() > expiry;
}

// Simulate silent refresh
export function mockSilentRefresh() {
    if (isTokenExpired()) {
        const newToken = "refreshed-jwt-" + Math.random().toString(36).substring(2, 10);
        const newExpiry = Date.now() + 1 * 60 * 1000;
        localStorage.setItem("token", newToken);
        localStorage.setItem("tokenExpiry", newExpiry.toString());
        console.log("🔄 Silent refresh done:", newToken);
    }
}

// Optional: Run refresh check periodically
export function setupAutoRefresh() {
    setInterval(() => {
        mockSilentRefresh();
    }, 5 * 1000); // check every 10s
}
