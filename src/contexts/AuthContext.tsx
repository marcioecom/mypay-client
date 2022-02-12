import React, { createContext, ReactNode, useState } from "react";
import api from "../services/api";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: ({ email, password }: LoginRequest) => Promise<void>;
  handleRegister: ({ firstName, lastName, email, password }: RegisterRequest) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest extends LoginRequest {
  firstName: string;
  lastName: string;
}

const AuthContext = createContext({} as AuthContextType);

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function handleLogin({ email, password }: LoginRequest) {
    const { data } = await api.post("/login", { email, password });

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('refresh_token', data.refreshToken.id);
      return setIsAuthenticated(true);
    }

    throw new Error(data.message)
  }

  async function handleRegister({
    firstName, lastName, email, password
  }: RegisterRequest) {
    const { data } = await api.post("/users", { firstName, lastName, email, password });

    if (data.error) {
      throw new Error(data.message)
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('refresh_token', data.refreshToken.id);
    return setIsAuthenticated(true);
  }

  const context = { isAuthenticated, setIsAuthenticated, handleLogin, handleRegister }
  return (
    <AuthContext.Provider value={context}>
      { children }
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
