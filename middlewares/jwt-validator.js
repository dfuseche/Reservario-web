let jwt = require("jsonwebtoken");
const jwtKey = process.env.JSON_TOKEN;

// Función encargada de realizar la validación del token y que es directamente consumida por server.js
const checkToken = (req, res, next) => {
  let token = req.cookies.token;

  // Si existe algún valor para el token, se analiza. De lo contrario, un mensaje de error es retornado
  if (token) {
    // Llama la función verify del paquete jsonwebtoken que se encarga de realizar la validación del token con el secret proporcionado
    jwt.verify(token, jwtKey, (err, decoded) => {
      // Si no pasa la validación, un mensaje de error es retornado. De lo contrario, permite a la solicitud continuar
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Auth token is not supplied",
    });
  }
};

module.exports = {
  checkToken,
};
