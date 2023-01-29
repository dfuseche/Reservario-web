const client = require("../lib/mongolib");
const ObjectId = require("mongodb").ObjectId;

function Reserva() {
  const reserva = {};

  const connection = client
    .connect()
    .then((result) => result.db("reservascompany").collection("reservas"));

  reserva.findAll = () => {
    return connection.then((c) => c.find({}).toArray());
  };

  reserva.findAllByUserId = (idUsuario) => {
    return connection.then((c) =>
      c.find({ idUsuario: ObjectId(idUsuario) }).toArray(),
    );
  };

  reserva.findOne = (id) => {
    return connection.then((c) => c.findOne({ _id: ObjectId(id) }));
  };

  reserva.insertOne = (data) => {
    return connection.then((c) => c.insertOne(data));
  };

  reserva.replaceOne = (id, data) => {
    return connection.then((c) => c.replaceOne({ _id: ObjectId(id) }, data));
  };

  reserva.deleteOne = (id) => {
    return connection.then((c) => c.deleteOne({ _id: ObjectId(id) }));
  };

  return reserva;
}

module.exports = Reserva();
