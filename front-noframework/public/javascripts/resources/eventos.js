import {
  getSelectEvento,
  getCardTemplate,
} from "../templates/eventosTemplates.js";
import * as app from "../app.js";
import * as reservas from "./reservas.js";

export const seccionSelectEvento =
  document.getElementsByClassName("select-evento")[0];

//----------------------------------------
// Select evento
//----------------------------------------

export function renderSelectEvento() {
  seccionSelectEvento.innerHTML = getSelectEvento();

  const seccionListaEventos = document.getElementById("seccion-lista-eventos");
  fetch("api/eventos")
    .then((resp) => resp.json())
    .then((eventos) => {
      eventos.forEach((evento) => {
        const card = document.createElement("div");
        card.innerHTML = getCardTemplate(evento);
        seccionListaEventos.appendChild(card);
        addListenerBotonReservar(document.getElementById(evento._id), evento);
      });
    });
}

function addListenerBotonReservar(nodo, evento) {
  // node --> Boton de cada card (que al presionar oculta el contenedor y despliega el detail)
  nodo.addEventListener("click", () => {
    app.cambiarPagina(reservas.seccionHacerReserva, "block");
    reservas.renderHacerReserva("Evento", evento);
  });
}
