const client = require("../lib/mongolib");
const ObjectId = require("mongodb").ObjectId;

function Evento() {
  const evento = {};

  const connection = client
    .connect()
    .then((result) => result.db("reservascompany").collection("eventos"));

  evento.findAll = () => {
    return connection.then((c) => c.find({}).toArray());
  };

  evento.findOne = (id) => {
    return connection.then((c) => c.findOne({ _id: ObjectId(id) }));
  };

  evento.insertOne = (data) => {
    return connection.then((c) => c.insertOne(data));
  };

  evento.replaceOne = (id, data) => {
    return connection.then((c) => c.replaceOne({ _id: ObjectId(id) }, data));
  };

  evento.deleteOne = (id) => {
    return connection.then((c) => c.deleteOne({ _id: ObjectId(id) }));
  };

  return evento;
}

module.exports = Evento();