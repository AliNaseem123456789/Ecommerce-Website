// src/utils/jwt.js

// Create a simple “JWT” (insecure, just base64 encode)
export function createJWT(payload) {
  return btoa(JSON.stringify(payload));
}

// Decode the “JWT”
export function decodeJWT(token) {
  try {
    return JSON.parse(atob(token));
  } catch (e) {
    return null;
  }
}

// Store token in localStorage
export function setToken(token) {
  localStorage.setItem("token", token);
}

// Get token from localStorage
export function getToken() {
  return localStorage.getItem("token");
}

// Remove token (logout)
export function removeToken() {
  localStorage.removeItem("token");
}
