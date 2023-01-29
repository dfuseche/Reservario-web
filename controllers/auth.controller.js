const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JSON_TOKEN;

async function login(user) {
  const { username, password } = user;

  // Validar si el usuario y la contrasena existen
  // Verificar usuario y contrasena con BD
  // Crear token
  // Enviar Token
  if (username && password) {
    try {
      const currentUser = await getUserByUserName(username);
      if (!currentUser) {
        return {
          success: false,
          msg: "Incorrect username and/or password",
        };
      }
      const validation = bcryptjs.compareSync(password, currentUser.password);
      if (validation) {
        let token = jwt.sign({ username, nombre: currentUser.nombre }, jwtKey, {
          expiresIn: "2h",
        });

        return {
          success: true,
          msg: "Logged successfully",
          token,
          user: {
            nombre: currentUser.nombre,
            cedula: currentUser.cedula,
            telefono: currentUser.telefono,
            username: currentUser.username,
          },
        };
      } else {
        return {
          success: false,
          msg: "Incorrect username and/or password",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        msg: "Internal error",
      };
    }
  } else {
    return {
      success: false,
      msg: "Incorrect username and/or password",
    };
  }
}

module.exports = { login };
