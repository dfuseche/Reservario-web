import React, { useEffect } from "react";
import { BrowserRouter as Navigate, useNavigate } from "react-router-dom";

const Logout = (props) => {
  const navigate = useNavigate();
  fetch("auth/logout");
  localStorage.removeItem("Nombre");

  useEffect(() => {
    props.setNombreUsuario(null);
    navigate("/home");
  }, []);

  return <></>;
};

export default Logout;
