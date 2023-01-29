 import React from "react";
import { useForm } from "../../../hooks/useForm";
import { BrowserRouter as Navigate, useNavigate, Link } from "react-router-dom";
import PasswordStrengthBar from "react-password-strength-bar";
import { FormattedMessage } from "react-intl";
import swal from 'sweetalert';

const Register = (props) => {
  const navigate = useNavigate();
  const [formValues, handleInputChange] = useForm({
    nombre: "",
    cedula: "",
    telefono: "",
    username: "",
    password: "",
    email: "",
  });

  const { nombre, cedula, telefono, username, password, email } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("api/usuarios/", {
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
          swal("Usuario registrado", "El usuario ya se encuentra registrado", "Warning");
          break;
        case 404:
          swal("Error 404", "Error interno del sistema", "error");
          break;
        default:
          swal({
            title: "¡Bienvenido!",
            text: "Usuario registrado existosamente",
            icon: "success",
            button: "Ir a la plataforma",
          });

          resp.json().then((data) => {
            localStorage.setItem("Nombre", data.user.nombre);
            props.setNombreUsuario(data.user.nombre);
            navigate("home");
          });
      }
    });
  };

  return (
    <div className="register">
      <div id="header-register">
        <h2>
          <FormattedMessage id="Registrarse" />
        </h2>
      </div>
      <div id="seccion-form-register">
        <form onSubmit={handleSubmit}>
          <table className="table" id="form-register">
            <tbody>
              <tr>
                <td>
                  <label>
                    <FormattedMessage id="Nombre" />:
                  </label>
                </td>
                <td>
                <FormattedMessage id="Nombre" >
                      {(placeholder)=> (
                          <input
                            id="nombre-register"
                            name="nombre"
                            placeholder={placeholder}
                            type="text"
                            autoComplete="on"
                            value={nombre}
                            onChange={handleInputChange}
                          />
                          )}
                  </FormattedMessage>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    <FormattedMessage id="Cedula" />:
                  </label>
                </td>
                <td>
                <FormattedMessage id="Cedula" >
                      {(placeholder)=> (
                        <input
                          id="cedula-register"
                          name="cedula"
                          placeholder={placeholder}
                          type="number"
                          autoComplete="off"
                          value={cedula}
                          onChange={handleInputChange}
                        />
                        )}
                </FormattedMessage>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    <FormattedMessage id="Telefono" />:
                  </label>
                </td>
                <td>
                <FormattedMessage id="Tel" >
                      {(placeholder)=> (
                  <input
                    id="telefono-register"
                    name="telefono"
                    placeholder={placeholder}
                    type="number"
                    autoComplete="on"
                    value={telefono}
                    onChange={handleInputChange}
                  />
                  )}
                </FormattedMessage>
                </td>
              </tr>
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
                      id="username-register"
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
                        id="password-register"
                        name="password"
                        placeholder={placeholder}
                        type="password"
                        autoComplete="off"
                        value={password}
                        onChange={handleInputChange}
                      />
                      )}
                </FormattedMessage>
                  <div className="indicator">
                    <PasswordStrengthBar
                      password={password}
                      barColors={[
                        "#B83E26",
                        "#FFB829",
                        "#c4c400",
                        "#7fad09",
                        "#009200",
                        "#004000",
                      ]}
                      minLength={5}
                      style={{ width: 300 }}
                      scoreWords={[
                        "Password is too weak",
                        "okay",
                        "good",
                        "strong",
                        "stronger",
                      ]}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    <FormattedMessage id="Email" />:
                  </label>
                </td>
                <td>
                <FormattedMessage id="Email" >
                            {(placeholder)=> (
                  <input
                    id="email-register"
                    name="email"
                    placeholder={placeholder}
                    type="email"
                    autoComplete="on"
                    value={email}
                    onChange={handleInputChange}
                  />
                  )}
                </FormattedMessage>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button id="submit-register" type="submit">
                    <FormattedMessage id="Registrarse" />
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <label>
                    <FormattedMessage id="YaCuenta" /> &nbsp;
                  </label>
                  <Link to="/login">
                    <button id="ir-a-login">
                      <FormattedMessage id="IniciarSesion" />
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

export default Register;
