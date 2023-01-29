import React from "react";
import { useForm } from "../../../hooks/useForm";
import { BrowserRouter as Navigate, useNavigate, Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import swal from 'sweetalert';

const Login = (props) => {
  const navigate = useNavigate();
  const [formValues, handleInputChange] = useForm({
    username: "",
    password: "",
  });

  const { username, password } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("auth/login/", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    }).then((resp) => {
      switch (resp.status) {
        case 400:
          swal("Error 400", "Ups! Parece que tus datos son inválidos de acuerdo a nuestras políticas internas", "warning");
          break;
        case 401:
          swal("Datos incorrectos", "Usuario o contraseña incorrecta", "error");
          break;
        case 404:
          swal("Error 404", "Error interno del sistema", "error");
          break;
        case 500:
          swal("Error 500", "Error interno del sistema", "error");
          break;
        default:
          resp.json().then((data) => {
            localStorage.setItem("Nombre", data.user.nombre);
            props.setNombreUsuario(data.user.nombre);
            navigate("home");
          });
      }
    });
  };

  return (
    <div className="login">
      <div id="header-login">
        <h2>
          <FormattedMessage id="IniciarSesion" />
        </h2>
      </div>
      <div id="seccion-form-login">
        <form onSubmit={handleSubmit}>
          <table className="table" id="form-login">
            <tbody>
              <tr>
                <td>
                  <label>
                    <FormattedMessage id="Usuario" />:
                  </label>
                </td>
                <td>
                  <FormattedMessage id="nombreUser" >
                    {(placeholder)=> (
                      <input
                      id="username-login"
                      name="username"
                      placeholder={placeholder}
                      type="text"
                      autoComplete="on"
                      value={username}
                      onChange={handleInputChange}
                    />
                    )}
                  </FormattedMessage>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    <FormattedMessage id="Contraseña" />:
                  </label>
                </td>
                <td>
                  <FormattedMessage id="Contraseña" >
                      {(placeholder)=> (
                    <input
                      id="password-login"
                      name="password"
                      placeholder={placeholder}
                      type="password"
                      autoComplete="off"
                      value={password}
                      onChange={handleInputChange}
                    />
                    )}
                  </FormattedMessage>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button id="submit-login" type="submit">
                    <FormattedMessage id="IniciarSesion" />
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <label>
                    <FormattedMessage id="NoCuenta" /> &nbsp;
                  </label>
                  <Link to="/register">
                    <button id="ir-a-register">
                      <FormattedMessage id="Registrarse" />!
                    </button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default Login;
