const client = require("../lib/mongolib");
const ObjectId = require("mongodb").ObjectId;

function Restaurante() {
  const restaurante = {};
  const connection = client
    .connect()
    .then((result) => result.db("reservascompany").collection("restaurante"));

  restaurante.findAll = () => {
    return connection.then((c) => c.find({}).toArray());
  };

  restaurante.findOne = (id) => {
    return connection.then((c) => c.findOne({ _id: ObjectId(id) }));
  };

  restaurante.insertOne = (data) => {
    return connection.then((c) => c.insertOne(data));
  };

  restaurante.replaceOne = (id, data) => {
    return connection.then((c) => c.replaceOne({ _id: ObjectId(id) }, data));
  };

  restaurante.deleteOne = (id) => {
    return connection.then((c) => c.deleteOne({ _id: ObjectId(id) }));
  };

  return restaurante;
}

module.exports = Restaurante();
