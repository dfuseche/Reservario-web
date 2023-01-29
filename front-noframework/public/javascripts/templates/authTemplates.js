export const getRegister = () => `
  <div id="header-register">
    <h2>Registrarse</h2>
  </div>
  <div id="seccion-form-register">
    <table class="table" id="form-register">
      <tbody>
        <tr>
          <td><label>Nombre:</label></td>
          <td><input id="nombre-register" name="nombre"></td>
        </tr>
        <tr>
          <td><label>Cedula:</label></td>
          <td><input id="cedula-register" name="cedula" type="number"></td>
        </tr>
        <tr>
          <td><label>Telefono:</label></td>
          <td><input id="telefono-register" name="telefono" type="number"></td>
        </tr>
        <tr>
          <td><label>Usuario:</label></td>
          <td><input id="username-register" name="username"></td>
        </tr>
        <tr>
          <td><label>Contraseña:</label></td>
          <td><input id="password-register" name="password" type="password"></td>
        </tr>
        <tr>
          <td><label>Email:</label></td>
          <td><input id="email-register" maxlength="64"></td>
        </tr>
        <tr>
          <td colspan="2"><button id="submit-register">Registrarse</button></td>
        </tr>
        <tr>
          <td colspan="2">
            <label>Ya tienes una cuenta? </label>
            <button id="ir-a-login">Inicia Sesión!</button>
          </td>
        </tr>
      </tbody>
    </table>
  <div>
`;

export const getLogin = () => `
  <div id="header-login">
    <h2>Iniciar sesion</h2>
  </div>
  <div id="seccion-form-login">
    <table class="table" id="form-login">
      <tbody>
        <tr>
          <td><label>Usuario:</label></td>
          <td><input id="username-login" name="username"/></td>
        </tr>
        <tr>
          <td><label>Contraseña:</label></td>
          <td><input id="password-login" name="password" type="password"></td>
        </tr>
        <tr>
          <td colspan="2"><button id="submit-login">Iniciar sesion</button></td>
        </tr>
        <tr>
          <td colspan="2">
            <label>No tienes una cuenta? </label>
            <button id="ir-a-register">Registrate!</button>
          </td>
        </tr>
      </tbody>
    </table>
  <div>
`;
