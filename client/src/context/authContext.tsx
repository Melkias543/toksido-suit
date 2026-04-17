"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  login: (userData: any) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Prevent "flicker"

  useEffect(() => {
    const token = Cookies.get("token");
    const savedUser = Cookies.get("user_data");

    if (token && savedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData: any) => {
    setIsLoggedIn(true);
    setUser(userData);
    // Persist the user data so it survives a refresh
    Cookies.set("user_data", JSON.stringify(userData), { expires: 7 });
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user_data");
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
