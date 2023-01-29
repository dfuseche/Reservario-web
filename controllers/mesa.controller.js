const client = require("../lib/mongolib");
const ObjectId = require("mongodb").ObjectId;

function Mesa() {
    const mesa = {};
    const connection = client
        .connect().then((result)=> result.db("reservascompany").collection("mesas"));
    
    mesa.findAll = () => {
        return connection.then((c)=> c.find({}).toArray());
    };

    mesa.findOne = (id) => {
        return connection.then((c) => c.findOne({ _id: ObjectId(id) }));
      };
    
    mesa.insertOne = (data) => {
       return connection.then((c) => c.insertOne(data));
    };
    
    mesa.replaceOne = (id, data) => {
       return connection.then((c) => c.replaceOne({ _id: ObjectId(id) }, data));
    };
    
    mesa.deleteOne = (id) => {
       return connection.then((c) => c.deleteOne({ _id: ObjectId(id) }));
    };
    
      return mesa;
}

module.exports = Mesa();