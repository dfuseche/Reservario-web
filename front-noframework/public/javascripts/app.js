import * as auth from "./resources/auth.js";
import * as reservas from "./resources/reservas.js";
import * as establecimientos from "./resources/establecimientos.js";
import * as restaurantes from "./resources/restaurantes.js";
import * as centrosTuristicos from "./resources/centrosTuristicos.js";
import * as eventos from "./resources/eventos.js";

// Secciones Main Page
const seccionHeader = document.getElementsByClassName("header")[0];
const seccionCategories = document.getElementsByClassName("categories")[0];
const seccionSteps = document.getElementsByClassName("steps")[0];
const seccionTestimonies = document.getElementsByClassName("testimonies")[0];
const seccionContact__us = document.getElementsByClassName("contact__us")[0];

// Seccion actual
export let seccionActual = "Main Page";

//----------------------------------------
// Listeners Basicos (solo se renderizan una vez)
//----------------------------------------

function addBasicListeners() {
  // Navbar
  addListenerLogo();
  addListenerInicio();

  // Header
  addListenerReservar();
  addListenerVerReservasUsuario();
}

//----------------------------------------
// Navbar
//----------------------------------------

export function renderNavbar() {
  const nombreUsuario = localStorage.getItem("Nombre");
  const botonRegister = document.getElementsByClassName("btn-register")[0];
  const botonLogin = document.getElementsByClassName("btn-login")[0];
  const botonLogout = document.getElementsByClassName("btn-logout")[0];
  const labelSesion = document.getElementsByClassName("nav-session")[0];

  if (nombreUsuario == null) {
    // No se ha iniciado sesion
    addListenerBotonRegister();
    addListenerBotonLogin();
    botonRegister.style.display = "block";
    botonLogin.style.display = "block";
    botonLogout.style.display = "none";
    labelSesion.innerHTML = "";
  } else {
    // Ya se inició sesión
    addListenerBotonLogout();
    botonRegister.style.display = "none";
    botonLogin.style.display = "none";
    botonLogout.style.display = "block";
    labelSesion.innerHTML = "Bienvenid@ " + nombreUsuario;
  }
}

function addListenerLogo() {
  const logo = document.getElementsByClassName("header__logo")[0];
  logo.addEventListener("click", () => {
    cambiarPagina("Main Page");
  });
}

function addListenerInicio() {
  const inicio = document.getElementById("inicio");
  inicio.addEventListener("click", () => {
    cambiarPagina("Main Page");
  });
}

function addListenerBotonRegister() {
  const botonRegister = document.getElementsByClassName("btn-register")[0];
  botonRegister.addEventListener("click", () => {
    cambiarPagina(auth.seccionRegister, "block");
    auth.renderRegister();
  });
}

function addListenerBotonLogin() {
  const botonLogin = document.getElementsByClassName("btn-login")[0];
  botonLogin.addEventListener("click", () => {
    cambiarPagina(auth.seccionLogin, "block");
    auth.renderLogin();
  });
}

function addListenerBotonLogout() {
  const botonLogout = document.getElementsByClassName("btn-logout")[0];
  botonLogout.addEventListener("click", () => {
    auth.logout();
  });
}

//----------------------------------------
// Header
//----------------------------------------

function addListenerReservar() {
  const botonLogin = document.getElementsByClassName(
    "btn-reserve my-2 my-sm-0",
  )[0];
  botonLogin.addEventListener("click", () => {
    const nombreUsuario = localStorage.getItem("Nombre");
    if (nombreUsuario == null) {
      alert("Inicia sesion para hacer una reserva");
      cambiarPagina(auth.seccionLogin, "block");
      auth.renderLogin();
    } else {
      cambiarPagina(establecimientos.seccionSelectTipoEstablecimiento, "block");
      establecimientos.renderSelectTipoEstablecimiento();
    }
  });
}

function addListenerVerReservasUsuario() {
  const botonLogin = document.getElementsByClassName(
    "btn-see-reserves my-2 my-sm-0",
  )[0];
  botonLogin.addEventListener("click", () => {
    const nombreUsuario = localStorage.getItem("Nombre");
    if (nombreUsuario == null) {
      alert("Inicia sesion para ver tus reservas");
      cambiarPagina(auth.seccionLogin, "block");
      auth.renderLogin();
    } else {
      cambiarPagina(reservas.seccionVerReservasUsuario, "block");
      reservas.renderVerReservasUsuario();
    }
  });
}

//----------------------------------------
// Metodos auxiliares
//----------------------------------------

// Recibe la sección a mostrar y su tipo de display ("block", "flex", etc.)
// Si la nueva seccion es la Main Page, se recibe el String "Main Page"
export function cambiarPagina(seccionNueva, display) {
  if (seccionActual == "Main Page") {
    seccionHeader.style.display = "none";
    seccionCategories.style.display = "none";
    seccionSteps.style.display = "none";
    seccionTestimonies.style.display = "none";
    seccionContact__us.style.display = "none";
  } else {
    seccionActual.innerHTML = "";
  }

  if (seccionNueva === "Main Page") {
    seccionHeader.style.display = "block";
    seccionCategories.style.display = "block";
    seccionSteps.style.display = "block";
    seccionTestimonies.style.display = "block";
    seccionContact__us.style.display = "block";
    seccionActual = "Main Page";
  } else {
    seccionNueva.style.display = display;
    seccionActual = seccionNueva;
  }
}

export function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//----------------------------------------
// Ejecucion del metodo de carga - "Main"
//----------------------------------------

// La ejecuta despues de que se haya cargado todo el DOM
document.addEventListener("DOMContentLoaded", () => {
  addBasicListeners();
  renderNavbar();
});
