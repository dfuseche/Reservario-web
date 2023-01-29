import {
  getSelectCentroTuristico,
  getCardTemplate,
} from "../templates/centrosTuristicosTemplates.js";
import * as app from "../app.js";
import * as reservas from "./reservas.js";

export const seccionSelectCentroTuristico = document.getElementsByClassName(
  "select-centro-turistico",
)[0];

//----------------------------------------
// Select centro turistico
//----------------------------------------

export function renderSelectCentroTuristico() {
  seccionSelectCentroTuristico.innerHTML = getSelectCentroTuristico();

  const seccionListaCentroTuristicos = document.getElementById(
    "seccion-lista-centros-turisticos",
  );
  fetch("api/centroturistico")
    .then((resp) => resp.json())
    .then((centrosTuristicos) => {
      centrosTuristicos.forEach((centroTuristico) => {
        const card = document.createElement("div");
        card.innerHTML = getCardTemplate(centroTuristico);
        seccionListaCentroTuristicos.appendChild(card);
        addListenerBotonReservar(
          document.getElementById(centroTuristico._id),
          centroTuristico,
        );
      });
    });
}

function addListenerBotonReservar(nodo, centroTuristico) {
  // node --> Boton de cada card (que al presionar oculta el contenedor y despliega el detail)
  nodo.addEventListener("click", () => {
    app.cambiarPagina(reservas.seccionHacerReserva, "block");
    reservas.renderHacerReserva("Centro turístico", centroTuristico);
  });
}
