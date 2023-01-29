const client = require("../lib/mongolib");

const ObjectId = require("mongodb").ObjectId;



function CentroTuristico () {

  const centroTuristico = {};



  const connection = client

    .connect()

    .then((result) => result.db("reservascompany").collection("centrosTuristicos"));



  centroTuristico.findAll = () => {

    return connection.then((c) => c.find({}).toArray());

  };



  centroTuristico.findOne = (id) => {

    return connection.then((c) => c.findOne({ _id: ObjectId(id) }));

  };



  centroTuristico.insertOne = (data) => {

    return connection.then((c) => c.insertOne(data));

  };



  centroTuristico.replaceOne = (id, data) => {

    return connection.then((c) => c.replaceOne({ _id: ObjectId(id) }, data));

  };



  centroTuristico.deleteOne = (id) => {

    return connection.then((c) => c.deleteOne({ _id: ObjectId(id) }));

  };



  return centroTuristico;

}



module.exports = CentroTuristico();

