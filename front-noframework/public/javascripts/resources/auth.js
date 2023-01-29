import { getRegister, getLogin } from "../templates/authTemplates.js";
import * as app from "../app.js";

export const seccionRegister = document.getElementsByClassName("register")[0];
export const seccionLogin = document.getElementsByClassName("login")[0];

//----------------------------------------
// Register
//----------------------------------------

export function renderRegister() {
  seccionRegister.innerHTML = getRegister();
  addListenerBotonSubmitRegister();
  addListenerBotonIrALogin();
}

function addListenerBotonSubmitRegister() {
  const botonSumbitRegister = document.getElementById("submit-register");
  botonSumbitRegister.addEventListener("click", () => {
    register();
  });
}

function register() {
  const nuevaReserva = {
    nombre: document.getElementById("nombre-register").value,
    cedula: document.getElementById("cedula-register").value,
    telefono: document.getElementById("telefono-register").value,
    username: document.getElementById("username-register").value,
    password: document.getElementById("password-register").value,
    email: document.getElementById("email-register").value,
  };

  fetch("api/usuarios/", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevaReserva),
  }).then((resp) => {
    switch (resp.status) {
      case 400:
        alert("Error: datos invalidos");
        break;
      case 401:
        alert("Error: el usuario ya esta registrado");
        break;
      case 404:
        alert("Error interno del sistema");
        break;
      default:
        alert("Usuario registrado con exito!");

        resp.json().then((data) => {
          localStorage.setItem("Nombre", data.user.nombre);
          app.renderNavbar();
          app.cambiarPagina("Main Page");
        });
    }
  });
}

function addListenerBotonIrALogin() {
  const irALogin = document.getElementById("ir-a-login");
  irALogin.addEventListener("click", () => {
    app.cambiarPagina(seccionLogin, "block");
    renderLogin();
  });
}

//----------------------------------------
// Login
//----------------------------------------

export function renderLogin() {
  seccionLogin.innerHTML = getLogin();
  addListenerBotonSubmitLogin();
  addListenerBotonIrARegister();
}

function addListenerBotonSubmitLogin() {
  const botonSumbitLogin = document.getElementById("submit-login");
  botonSumbitLogin.addEventListener("click", () => {
    login();
  });
}

function login() {
  const datosUsuario = {
    username: document.getElementById("username-login").value,
    password: document.getElementById("password-login").value,
  };

  fetch("auth/login/", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosUsuario),
  }).then((resp) => {
    switch (resp.status) {
      case 400:
        alert("Error: datos invalidos");
        break;
      case 401:
        alert("Error: usuario o contraseña incorrecta");
        break;
      case 404:
        alert("Error interno del sistema");
        break;
      default:
        resp.json().then((data) => {
          localStorage.setItem("Nombre", data.user.nombre);
          app.renderNavbar();
          app.cambiarPagina("Main Page");
        });
    }
  });
}

function addListenerBotonIrARegister() {
  const irARegister = document.getElementById("ir-a-register");
  irARegister.addEventListener("click", () => {
    app.cambiarPagina(seccionRegister, "block");
    renderRegister();
  });
}

//----------------------------------------
// Logout
//----------------------------------------

export function logout() {
  fetch("auth/logout");
  localStorage.removeItem("Nombre");
  app.renderNavbar();
  if (app.seccionActual != "Main Page") {
    app.cambiarPagina("Main Page");
  }
}
