import React, { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";

interface AuthContextType {
  loading: boolean;
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
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticated(true)
    }

    setLoading(false)
  }, [])

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

  const context = {
    isAuthenticated, setIsAuthenticated, handleLogin, handleRegister, loading
  }
  return (
    <AuthContext.Provider value={context}>
      { children }
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
