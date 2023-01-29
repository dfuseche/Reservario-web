export const getSelectCentroTuristico = () => `
<div id="header-select-centro-turistico">
    <h2>Selecciona un centro turístico</h2>
    <div id="seccion-lista-centros-turisticos"></div>
</div>
`;

export const getCardTemplate = (centroTuristico) => `
<div class="card" id="${centroTuristico.nit}" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${centroTuristico.nombre}</h5>
    <p class="card-text">${centroTuristico.descripcion}
      <img src="${centroTuristico.img}" class="card-img-top" alt="...">
      <br/>
      <br> <b>Capacidad: </b> ${parseInt(centroTuristico.capacidad)} </br>
      <br> <b>Correo: </b> ${centroTuristico.correo} </br>
      <br> <b>Dirección: </b> ${centroTuristico.direccion} </br>
      <br> <b>Telefono: </b> ${centroTuristico.telefono} </br>
    </p>
    <button type="button" class="btn btn-outline-danger" id="${
      centroTuristico._id
    }">¡ Reserva ya !</button>
  </div>
</div>
`;
