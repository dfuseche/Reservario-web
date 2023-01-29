export const getSelectRestaurante = () => `
<div id="header-select-restaurante">
    <h2>Selecciona un restaurante</h2>
    <div id="seccion-lista-restaurantes"></div>
</div>
`;

export const getCardTemplate = (restaurante) => `
<div class="card" id="${restaurante.nit}" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${restaurante.nombre}</h5>
    <p class="card-text">${restaurante.descripcion}
        <br/>
        <br> <b>Capacidad: </b> ${parseInt(restaurante.capacidad)} </br>
        <br> <b>Correo: </b> ${restaurante.correo} </br>
        <br> <b>Dirección: </b> ${restaurante.direccion} </br>
        <br> <b>Telefono: </b> ${restaurante.telefono} </br>
    </p>
    <button type="button" class="btn btn-outline-danger" id="${
      restaurante._id
    }">¡ Reserva ya !</button>
  </div>
</div>
`;

export const getCreateRestaurante = () => `
  <div id="header-create-restaurante">
    <h2>Crear Restaurante</h2>
  </div>
  <div id="seccion-form-create-restaurante">
    <table class="table" id="form-restaurante">
      <tbody>
        <tr>
          <td><label>NIT:</label></td>
          <td><input id="nit-restaurante" /></td>
        </tr>
        <tr>
          <td><label>Nombre:</label></td>
          <td><input id="nombre-restaurante"/></td>
        </tr>
        <tr>
          <td><label>Dirección:</label></td>
          <td><input id="direccion-restaurante"/></td>
        </tr>
        <tr>
          <td><label>Correo:</label></td>
          <td><input id="correo-restaurante"/></td>
        </tr>
        <tr>
          <td><label>Teléfono:</label></td>
          <td><input id="telefono-restaurante"/></td>
        </tr>
        <tr>
          <td><label>Descripción:</label></td>
          <td><input id="descripcion-restaurante"/></td>
        </tr>
        <tr>
          <td><label>Tipo de restaurante:</label></td>
          <td><input id="tipo-restaurante"/></td>
        </tr>
        <tr>
          <td><label>Capacidad:</label></td>
          <td><input id="capacidad-restaurante"/></td>
        </tr>
        <tr>
          <td><label>Número de mesas:</label></td>
          <td><input id="mesas-restaurante" type="number"></td>
        </tr>
        <tr>
          <td><label>Número de sillas por mesa:</label></td>
          <td><input id="numeroSillas-restaurante" type="number"></td>
        </tr>
        <tr>          
          <td><label> Entretenimiento</label><br></td>
          <td><input type="checkbox" id="entretenimiento-restaurante"></td>
        </tr>
        <tr>
          <td colspan="2"><button id="submit-create-restaurante">Crear restaurante</button></td>
        </tr>
      </tbody>
    </table>
  <div>
`;
