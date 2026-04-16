import { useContext, useState } from "react";
import React from "react";
import { useAuth } from "../Context/AuthContext";
import { register, login as apilogin } from "../Api/authService";

const useAuthActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const handleRegister = async (userData, onSuccess) => {
    setLoading(true);

    try {
      const data = new FormData();

      const allowed = [
        "username",
        "email",
        "password",
        "password_confirmation",
        "avatar",
      ];

      allowed.forEach((key) => {
        // Check if the value exists and is not an empty string
        if (userData[key] !== "" && userData[key] !== null) {
          data.append(key, userData[key]);
        }
      });

      const res = await register(data); // Send the FormData

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        login(); // Call the function to set isLoggedIn to true
        if (onSuccess) onSuccess(); // Tell the Modal to close
      }
    } catch (err) {
      // This will print things like "The password confirmation does not match"
      console.log("Detailed Errors:", err.response?.data?.errors);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false); // Stop the spinner no matter what
    }
  };

  const handleLogin = async (credentials, onSuccess) => {
    setLoading(true);
    setError("");

    try {
      // 1. This calls the function from authService call loged
      const res = await apilogin(credentials);

      // 2. the token is in res.token
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        login(); // Call the function to set isLoggedIn to true
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      // 4. Handle wrong password/email
      const msg = err.response?.data?.message || "Invalid credentials";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleRegister,
    handleLogin,
    loading,
    error,
  };
};

export default useAuthActions;
