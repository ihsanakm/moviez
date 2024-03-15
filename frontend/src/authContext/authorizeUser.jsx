import React from "react";
import { useAuth } from "./authContext";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AuthorizeUser = async () => {
  const { isLoggedIn, login, logout } = useAuth();

  if (isLoggedIn === false) {
    return <Navigate to="/login" />;
  }
  await axios.get("http://localhost:3000/check-auth", {
    withCredentials: true,
  });

  return <div>{children}</div>;
};

export default AuthorizeUser;
