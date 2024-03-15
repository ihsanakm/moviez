import React, { useState, useEffect } from "react";
import { useAuth } from "./authContext";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AuthorizeUser = ({ children }) => {
  const { isLoggedIn, login, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (isLoggedIn) {
        try {
          await axios.get("http://localhost:3000/check-auth", {
            withCredentials: true,
          });
          setLoading(false);
        } catch (error) {
          console.error("Error checking authentication:", error);
        }
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [isLoggedIn]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
};

export default AuthorizeUser;
