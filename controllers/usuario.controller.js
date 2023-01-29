const client = require("../lib/mongolib");
const ObjectId = require("mongodb").ObjectId;
let jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const jwtKey = process.env.JSON_TOKEN;

function Usuario() {
  const usuario = {};

  const connection = client
    .connect()
    .then((result) => result.db("reservascompany").collection("usuarios"));

  usuario.findAll = () => {
    return connection.then((c) => c.find({}).toArray());
  };

  usuario.findOne = (id) => {
    return connection.then((c) => c.findOne({ _id: ObjectId(id) }));
  };

  getUserByUserName = async (pUsername) => {
    return await connection.then((c) => c.findOne({ username: pUsername }));
  };

  checkIfUsernameExist = async (username) => {
    const existUser = await getUserByUserName(username);
    return existUser;
  };

  createUser = async (user) => {
    try {
      let {
        nombre,
        cedula,
        telefono,
        email,
        username,
        password,
        mediosdepago,
      } = user;

      if (username && password) {
        const existe = await checkIfUsernameExist(username);
        if (existe) {
          return {
            success: false,
            msg: "User is already registered",
          };
        }

        const salt = bcryptjs.genSaltSync();
        password = bcryptjs.hashSync(password, salt);

        const infoPost = await connection.then((c) =>
          c.insertOne({
            nombre,
            cedula,
            telefono,
            email,
            username,
            password,
            mediosdepago,
          }),
        );
        const token = jwt.sign({ username, nombre }, jwtKey);

        return {
          success: true,
          data: infoPost,
          token,
          user: {
            nombre: nombre,
            cedula: cedula,
            telefono: telefono,
            username: username,
          },
        };
      } else {
        return {
          success: false,
          msg: "Usuario o contraseña no validos",
        };
      }
    } catch (error) {
      return {
        success: false,
        msg: "Internal error",
      };
    }
  };

  usuario.replaceOne = (id, data) => {
    return connection.then((c) => c.replaceOne({ _id: ObjectId(id) }, data));
  };

  usuario.deleteOne = (id) => {
    return connection.then((c) => c.deleteOne({ _id: ObjectId(id) }));
  };

  return usuario;
}

module.exports = Usuario();
