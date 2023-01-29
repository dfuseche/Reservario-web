import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "./Navbar.css";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <Link to="/home" className="header__logo">
        <img className="header__pic" src="/img/Reservario.png" alt="Logo" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <input type="checkbox" className="checkbox" id="menu-toogle" />
        <label for="menu-toogle" className="menu-toogle"></label>
        <nav className="nav">
          {props.nombreUsuario == null ? (
            <>
              <Link to="/register">
                <button className="btn-register my-2 my-sm-0">
                  <FormattedMessage id="Registrarse" />
                </button>
              </Link>
              <Link to="/login">
                <button className="btn-login my-2 my-sm-0">
                  <FormattedMessage id="IniciarSesion" />
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/logout">
                <button className="btn-logout my-2 my-sm-0">
                  <FormattedMessage id="Cerrarsesion" />
                </button>
              </Link>
              <a className="nav-session">
                {"Bienvenid@ " + props.nombreUsuario}
              </a>
            </>
          )}
          <a href="/home" className="nav__item current" title='Inicio'>
            <FormattedMessage id="Inicio" />
          </a>
          <a href="/preguntasFrecuentes" className="nav__item" title='Preguntas Frecuentes'>
            <FormattedMessage id="PreguntasFrecuentes" />
          </a>
        </nav>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/home" id="inicio">
              <FormattedMessage id="Inicio" />
              <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/dashboard"
              id="dashboard"
            >
              <FormattedMessage id="Dashboard" />
            </Link>
          </li>
          <li className="nav-item preguntas">
            <Link
              className="nav-link"
              to="/preguntasFrecuentes"
              id="preguntasFrecuentes"
            >
              <FormattedMessage id="PreguntasFrecuentes" />
            </Link>
          </li>
        </ul>
        {props.nombreUsuario == null ? (
          <>
            <Link to="/register">
              <button className="btn-register my-2 my-sm-0">
                <FormattedMessage id="Registrarse" />
              </button>
            </Link>
            <Link to="/login">
              <button className="btn-login my-2 my-sm-0">
                <FormattedMessage id="IniciarSesion" />
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/logout">
              <button className="btn-logout my-2 my-sm-0">
                <FormattedMessage id="Cerrarsesion" />
              </button>
            </Link>
            <a className="nav-session" href="#">
              {"Bienvenid@ " + props.nombreUsuario}
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
