"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export interface User {
  id: string;
  name?: string;
  email?: string;
  role: string;
}

// 1. Define a proper Interface for the Context state
interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

// 2. Initialize the context with the correct type using <AuthContextType>
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true, // Start as true to match your initial state
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // 3. Explicitly type the useState hook
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 3. Explicitly tell the state that it can hold a User or null
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const savedUser = localStorage.getItem("user_data");

      if (savedUser) {
        try {
          const parsed: User = JSON.parse(savedUser);
          setUser(parsed);
          setIsLoggedIn(true);
        } catch (e) {
          console.error("Failed to parse user data", e);
          localStorage.removeItem("user_data");
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("user_data", JSON.stringify(userData));
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user_data"); 
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, isLoading }}
    >
      {/* Note: If you hide children until loading is done, 
          make sure your root layout can handle the empty flash. 
      */}
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
