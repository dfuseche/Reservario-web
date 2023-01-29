const client = require("../lib/mongolib");
const ObjectId = require("mongodb").ObjectId;

function Administrador() {
  const administrador = {};

  const connection = client
    .connect()
    .then((result) => result.db("reservascompany").collection("administradores"));

  administrador.findAll = () => {
    return connection.then((c) => c.find({}).toArray());
  };

  administrador.findOne = (id) => {
    return connection.then((c) => c.findOne({ _id: ObjectId(id) }));
  };

  administrador.insertOne = (data) => {
    return connection.then((c) => c.insertOne(data));
  };

  administrador.replaceOne = (id, data) => {
    return connection.then((c) => c.replaceOne({ _id: ObjectId(id) }, data));
  };

  administrador.deleteOne = (id) => {
    return connection.then((c) => c.deleteOne({ _id: ObjectId(id) }));
  };

  return administrador;
}

module.exports = Administrador();