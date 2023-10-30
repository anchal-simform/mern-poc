// utils/auth.js
export function isAuthenticated() {
  if (typeof window === "undefined") {
    return false; // Running on the server side, no access to localStorage
  }

  const token = localStorage.getItem("token");
  return !!token;
}
