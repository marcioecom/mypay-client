import React, { createContext, ReactNode, useState } from "react";
import api from "../services/api";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: ({ email, password }: UserRequest) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface UserRequest {
  email: string;
  password: string;
}

const AuthContext = createContext({} as AuthContextType);

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function handleLogin({ email, password }: UserRequest) {
    const { data } = await api.post("/login", { email, password });

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('refresh_token', data.refreshToken.id);
      return setIsAuthenticated(true);
    }

    throw new Error(data.message)
  }

  const context = { isAuthenticated, setIsAuthenticated, handleLogin }
  return (
    <AuthContext.Provider value={context}>
      { children }
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
