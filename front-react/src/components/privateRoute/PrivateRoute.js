import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const nombreUsuario = localStorage.getItem("Nombre");
  return nombreUsuario != null ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
