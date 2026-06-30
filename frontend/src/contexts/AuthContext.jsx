import React, { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("cv_token");
        if (!token) { setLoading(false); return; }
        authApi.me()
            .then(setUser)
            .catch(() => localStorage.removeItem("cv_token"))
            .finally(() => setLoading(false));
    }, []);

    const login = async (email, password) => {
        const data = await authApi.login({ email, password });
        localStorage.setItem("cv_token", data.token);
        setUser(data.user);
        return data.user;
    };

    const register = async (name, email, password) => {
        const data = await authApi.register({ name, email, password });
        localStorage.setItem("cv_token", data.token);
        setUser(data.user);
        return data.user;
    };

    const logout = () => {
        localStorage.removeItem("cv_token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
