const client = require("../lib/mongolib");
const ObjectId = require("mongodb").ObjectId;

function MedioDePago() {
  const mediodepago = {};

  const connection = client
    .connect()
    .then((result) => result.db("reservascompany").collection("medioDePago"));

  mediodepago.findAll = () => {
    return connection.then((c) => c.find({}).toArray());
  };

  mediodepago.findOne = (id) => {
    return connection.then((c) => c.findOne({ _id: ObjectId(id) }));
  };

  mediodepago.insertOne = (data) => {
    return connection.then((c) => c.insertOne(data));
  };

  mediodepago.replaceOne = (id, data) => {
    return connection.then((c) => c.replaceOne({ _id: ObjectId(id) }, data));
  };

  mediodepago.deleteOne = (id) => {
    return connection.then((c) => c.deleteOne({ _id: ObjectId(id) }));
  };

  return mediodepago;
}

module.exports = MedioDePago();