export const getSelectEvento = () => `
<div id="header-select-evento">
    <h2>Selecciona un evento</h2>
    <div id="seccion-lista-eventos"></div>
</div>
`;

export const getCardTemplate = (evento) => `
<div class="card" id="${evento.id}" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${evento.nombre}</h5>
    <p class="card-text">${evento.descripcion}
      <img src="${evento.img}"        " class="card-img-top" alt="...">
      <br/>
      <br> <b>Capacidad: </b> ${parseInt(evento.capacidad)} </br>
      <br> <b>Correo: </b> ${evento.correo} </br>
      <br> <b>Dirección: </b> ${evento.direccion} </br>
      <br> <b>Telefono: </b> ${evento.telefono} </br>
      <br> <b>Tipo: </b> ${evento.tipoDeEvento} </br>
    </p>
    <button type="button" class="btn btn-outline-danger" id="${
      evento._id
    }">¡ Reserva ya !</button>
  </div>
</div>
`;
