"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
export interface User {
  id: string;
  name?: string;
  email?: string;
  role: string; // This is the missing piece!
}
const AuthContext = createContext({
  isLoggedIn: false,
  user: User | null,
  login: (userData: any) => {},
  logout: () => {},
  isLoading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      // const token = Cookies.get("token");
      const savedUser = localStorage.getItem("user_data");

      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setUser(parsed);
          setIsLoggedIn(true);
          setIsLoading(false);
        } catch (e) {
          console.error("Failed to parse user data", e);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = (userData: any) => {
    setIsLoggedIn(true);
    setUser(userData);

    // ✅ save to localStorage instead of cookies
    localStorage.setItem("user_data", JSON.stringify(userData));
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user_data"); // ✅ changed
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, isLoading }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
