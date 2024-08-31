import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, path }) => {
  let isAuthenticated = false;

  const checkAccess = () => {
    try {
      const token = localStorage.getItem("JWTToken");
      if (token) {
        return true;
      } else {
        throw new Error("Invalid Permissions");
      }
    } catch (err) {
      localStorage.removeItem("JWTToken");
      return false;
    }
  };

  isAuthenticated = checkAccess()
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
