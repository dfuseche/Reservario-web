import {
  getSelectRestaurante,
  getCardTemplate,
  getCreateRestaurante,
} from "../templates/restaurantesTemplates.js";
import * as app from "../app.js";
import * as reservas from "./reservas.js";

export const seccionSelectRestaurante =
  document.getElementsByClassName("select-restaurante")[0];
export const seccionCreateRestaurante =
  document.getElementsByClassName("create-restaurante")[0];

//----------------------------------------
// Select restaurante
//----------------------------------------

export function renderSelectRestaurante() {
  seccionSelectRestaurante.innerHTML = getSelectRestaurante();

  const seccionListaRestaurantes = document.getElementById(
    "seccion-lista-restaurantes",
  );
  fetch("api/restaurante")
    .then((resp) => resp.json())
    .then((restaurantes) => {
      restaurantes.forEach((restaurante) => {
        const card = document.createElement("div");
        card.innerHTML = getCardTemplate(restaurante);
        seccionListaRestaurantes.appendChild(card);
        addListenerBotonReservar(
          document.getElementById(restaurante._id),
          restaurante,
        );
      });
    });
}

function addListenerBotonReservar(nodo, restaurante) {
  // node --> Boton de cada card (que al presionar oculta el contenedor y despliega el detail)
  nodo.addEventListener("click", () => {
    app.cambiarPagina(reservas.seccionHacerReserva, "block");
    reservas.renderHacerReserva("Restaurante", restaurante);
  });
}

//----------------------------------------
// Reubicar
//----------------------------------------

//addListenerBotonCrearRestaurante();

function addListenerBotonCrearRestaurante() {
  const botonCrearRestaurante = document.getElementsByClassName(
    "btn-crear-restaurante",
  )[0];
  botonCrearRestaurante.addEventListener("click", () => {
    salirDeMainPage(seccionCreateRestaurante, "block");
    renderCrearRestaurante();
  });
}

//----------------------------------------
// Probar - CreateRestaurante
//----------------------------------------

function renderCrearRestaurante() {
  seccionCreateRestaurante.innerHTML = getCreateRestaurante();
  addListenerBotonSubmitRestaurante();
}

function addListenerBotonSubmitRestaurante() {
  const botonSumbitRestaurante = document.getElementById("submit-restaurante");
  botonSumbitRestaurante.addEventListener("click", () => {
    crearRestaurante();
  });
}

function crearRestaurante() {
  let entretenimientoBool = false;
  if (document.getElementById("entretenimiento-restaurante").value == "on") {
    entretenimientoBool = true;
  }
  const datosRestaurante = {
    nit: document.getElementById("nit-restaurante").value,
    nombre: document.getElementById("nombre-restaurante").value,
    direccion: document.getElementById("direccion-restaurante").value,
    correo: document.getElementById("correo-restaurante").value,
    telefono: document.getElementById("telefono-restaurante").value,
    descripcion: document.getElementById("descripcion-restaurante").value,
    tipoDeRestaurante: document.getElementById("tipo-restaurante").value,
    capacidad: document.getElementById("capacidad-restaurante").value,
    numeroMesas: document.getElementById("mesas-restaurante").value,
    entretenimiento: entretenimientoBool,
  };

  fetch("/api/restaurante/", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosRestaurante),
  }).then((resp) => {
    switch (resp.status) {
      case 400:
        alert("Error: datos invalidos");
        break;
      case 200:
        print("Restaurante creado");
        cambiarARestaurantes();
        break;

      default:
        resp.json().then((data) => {
          print("Restaurante creado");
        });
    }
  });
}
