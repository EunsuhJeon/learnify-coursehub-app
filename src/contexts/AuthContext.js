import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }){
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken) {
            setToken(storedToken);

            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }

        setIsLoading(false);
    }, []);

    const login = async (token, userData) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    const updateProfile = ({ name, password }) => {
    setUser((prev) => {
      if (!prev) return prev;

      const next = {
        ...prev,
        name: typeof name === "string" ? name : prev.name,
        // ⚠️ mock: não faça isso em produção
        ...(typeof password === "string" && password.length > 0 ? { password } : {}),
      };

      localStorage.setItem("user", JSON.stringify(next));
      return next;
    });
    };

    return (
        <AuthContext.Provider
        value={{
            token,
            user,
            isLoading,
            login,
            logout,
            updateProfile,
            isAuthenticated: !!token,
        }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}