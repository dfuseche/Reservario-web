export const getHacerReserva = (tipo, establecimiento) => `
  <div id="header-hacer-reserva">
    <h2>Hacer reserva</h2>
  </div>
  <div id="seccion-form-hacer-reserva">
    <table class="table" id="form-hacer-reserva">
      <tbody>
        <tr>
          <td><label>${tipo}:</label></td>
          <td>${establecimiento.nombre}</td>
        </tr>
        <tr>
          <td><label>Cantidad de personas:</label></td>
          <td><input type="number" id="numeroPersonas-hacer-reserva" name="numeroPersonas" type="number"></td>
        </tr>
        <tr>
          <td><label>Medio de pago:</label></td>
          <td><input id="medioDePago-hacer-reserva" name="medioDePago"/></td>
        </tr>
        <tr>
          <td><label>Fecha de inicio:</label></td>
          <td><input id="fechaInicio-hacer-reserva" type="datetime-local" name="fechaInicio"/></td>
        </tr>
        <tr>
          <td><label>Fecha fin:</label></td>
          <td><input id="fechaFin-hacer-reserva" type="datetime-local" name="fechaFin"/></td>
        </tr>
        <tr>
          <td colspan="2"><button id="submit-hacer-reserva">Reservar</button></td>
        </tr>
      </tbody>
    </table>
  <div>
`;

export const getVerReservasUsuario = () => `
  <div id="header-ver-reservas-usuario">
    <h2>Reservas realizadas por el usuario</h2>
    <div id="seccion-lista-reservas-usuario"></div>
  </div>
`;

export const getCardTemplate = (reserva, establecimiento) => `
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h4 class="card-title">${establecimiento.nombre}</h4>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Numero de personas: ${reserva.numeroPersonas}</li>
    <li class="list-group-item">Medio de pago: ${reserva.medioDePago}</li>
  </ul>
</div>`;
