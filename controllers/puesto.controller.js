const client = require("../lib/mongolib");

const ObjectId = require("mongodb").ObjectId;



function Puesto () {

  const puesto = {};



  const connection = client

    .connect()

    .then((result) => result.db("reservascompany").collection("puestos"));



  puesto.findAll = () => {

    return connection.then((c) => c.find({}).toArray());

  };



  puesto.findOne = (id) => {

    return connection.then((c) => c.findOne({ _id: ObjectId(id) }));

  };



  puesto.insertOne = (data) => {

    return connection.then((c) => c.insertOne(data));

  };



  puesto.replaceOne = (id, data) => {

    return connection.then((c) => c.replaceOne({ _id: ObjectId(id) }, data));

  };



  puesto.deleteOne = (id) => {

    return connection.then((c) => c.deleteOne({ _id: ObjectId(id) }));

  };



  return puesto;

}



module.exports = Puesto();

