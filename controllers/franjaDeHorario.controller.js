const client = require("../lib/mongolib");
const ObjectId = require("mongodb").ObjectId;

function FranjaDeHorario() {
  const franjaDeHorario = {};

  const connection = client
    .connect()
    .then((result) =>
      result.db("reservascompany").collection("franjasDeHorario"),
    );

  franjaDeHorario.findAll = () => {
    return connection.then((c) => c.find({}).toArray());
  };

  franjaDeHorario.findOne = (id) => {
    return connection.then((c) => c.findOne({ _id: ObjectId(id) }));
  };

  franjaDeHorario.insertOne = (data) => {
    return connection.then((c) => c.insertOne(data));
  };

  franjaDeHorario.replaceOne = (id, data) => {
    return connection.then((c) => c.replaceOne({ _id: ObjectId(id) }, data));
  };

  franjaDeHorario.deleteOne = (id) => {
    return connection.then((c) => c.deleteOne({ _id: ObjectId(id) }));
  };

  return franjaDeHorario;
}

module.exports = FranjaDeHorario();
