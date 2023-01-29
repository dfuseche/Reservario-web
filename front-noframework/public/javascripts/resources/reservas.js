import {
  getHacerReserva,
  getVerReservasUsuario,
  getCardTemplate,
} from "../templates/reservasTemplates.js";
import * as app from "../app.js";

export const seccionHacerReserva =
  document.getElementsByClassName("hacer-reserva")[0];
export const seccionVerReservasUsuario =
  document.getElementsByClassName("ver-reservas")[0];

//----------------------------------------
// Hacer reserva
//----------------------------------------

export function renderHacerReserva(tipo, establecimiento) {
  seccionHacerReserva.innerHTML = getHacerReserva(tipo, establecimiento);
  addListenerBotonSubmitReserva(tipo, establecimiento);
}

function addListenerBotonSubmitReserva(tipo, establecimiento) {
  const botonSumbitReserva = document.getElementById("submit-hacer-reserva");
  botonSumbitReserva.addEventListener("click", () => {
    reservar(tipo, establecimiento);
  });
}

function reservar(tipo, establecimiento) {
  let varidRestaurante = null;
  let varidEvento = null;
  let varidCentroTuristico = null;

  if (tipo == "Restaurante") {
    varidRestaurante = establecimiento._id;
  } else if (tipo == "Evento") {
    varidEvento = establecimiento._id;
  } else {
    varidCentroTuristico = establecimiento._id;
  }
  const nuevaReserva = {
    idRestaurante: varidRestaurante,
    idEvento: varidEvento,
    idCentroTuristico: varidCentroTuristico,
    numeroPersonas: parseInt(
      document.getElementById("numeroPersonas-hacer-reserva").value,
    ),
    medioDePago: document.getElementById("medioDePago-hacer-reserva").value,
    fechaInicio:
      document.getElementById("fechaInicio-hacer-reserva").value +
      ":00.000+00:00",
    fechaFin:
      document.getElementById("fechaFin-hacer-reserva").value + ":00.000+00:00",
  };

  fetch("api/reservas/", {
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
      case 404:
        alert("Error interno del sistema");
        break;
      default:
        alert("Reserva realizada con exito!");

        app.cambiarPagina(seccionVerReservasUsuario, "block");
        renderVerReservasUsuario();
    }
  });
}

//----------------------------------------
// Ver reservas
//----------------------------------------

export function renderVerReservasUsuario() {
  seccionVerReservasUsuario.innerHTML = getVerReservasUsuario();

  const seccionListaReservas = document.getElementById(
    "seccion-lista-reservas-usuario",
  );
  fetch("api/reservas/usuario")
    .then((resp) => resp.json())
    .then((reservas) => {
      if (reservas.length > 0) {
        reservas.forEach(async (reserva) => {
          let varestablecimiento = null;
          if (reserva.idRestaurante != null) {
            await fetch("api/restaurante/" + reserva.idRestaurante)
              .then((resp) => resp.json())
              .then((establecimiento) => {
                varestablecimiento = establecimiento;
              });
          } else if (reserva.idEvento != null) {
            await fetch("api/eventos/" + reserva.idEvento)
              .then((resp) => resp.json())
              .then((establecimiento) => {
                varestablecimiento = establecimiento;
              });
          } else {
            await fetch("api/centroTuristico/" + reserva.idCentroTuristico)
              .then((resp) => resp.json())
              .then((establecimiento) => {
                varestablecimiento = establecimiento;
              });
          }
          const card = document.createElement("div");
          card.innerHTML = getCardTemplate(reserva, varestablecimiento);
          seccionListaReservas.appendChild(card);
        });
      } else {
        const label = document.createElement("h4");
        label.innerHTML = "No has realizado ninguna reserva";
        seccionListaReservas.appendChild(label);
      }
    });
}
