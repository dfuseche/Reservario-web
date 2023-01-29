import { getSelectTipoEstablecimiento } from "../templates/establecimientosTemplates.js";
import * as app from "../app.js";
import * as restaurantes from "./restaurantes.js";
import * as eventos from "./eventos.js";
import * as centrosTuristicos from "./centrosTuristicos.js";

export const seccionSelectTipoEstablecimiento = document.getElementsByClassName(
  "select-tipo-establecimiento",
)[0];

//----------------------------------------
// Seleccionar tipo de establecimiento
//----------------------------------------

export function renderSelectTipoEstablecimiento() {
  seccionSelectTipoEstablecimiento.innerHTML = getSelectTipoEstablecimiento();
  addListenerBotonRestaurantes();
  addListenerBotonEventos();
  addListenerBotonCentrosTuristicos();
}

function addListenerBotonRestaurantes() {
  const botonRestaurantes = document.getElementsByClassName(
    "btn-restaurantes my-2 my-sm-0",
  )[0];
  botonRestaurantes.addEventListener("click", () => {
    app.cambiarPagina(restaurantes.seccionSelectRestaurante, "block");
    restaurantes.renderSelectRestaurante();
  });
}

function addListenerBotonEventos() {
  const botonEventos = document.getElementsByClassName(
    "btn-eventos my-2 my-sm-0",
  )[0];
  botonEventos.addEventListener("click", () => {
    app.cambiarPagina(eventos.seccionSelectEvento, "block");
    eventos.renderSelectEvento();
  });
}

function addListenerBotonCentrosTuristicos() {
  const botonCentrosTuristicos = document.getElementsByClassName(
    "btn-centros-turisticos my-2 my-sm-0",
  )[0];
  botonCentrosTuristicos.addEventListener("click", () => {
    app.cambiarPagina(centrosTuristicos.seccionSelectCentroTuristico, "block");
    centrosTuristicos.renderSelectCentroTuristico();
  });
}
