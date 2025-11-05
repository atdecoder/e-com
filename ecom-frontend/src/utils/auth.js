"use client";

export const login = (username, password) => {
  // simple check (replace with backend API if needed)
  if (username === "admin" && password === "123456") {
    localStorage.setItem("token", "dummy_token");
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return typeof window !== "undefined" && !!localStorage.getItem("token");
};
