const { MongoClient } = require("mongodb");
const uri = process.env.DB_HOST;
const client = new MongoClient(uri, { useUnifiedTopology: true });

const testConnection = () => {
  client.connect().then((connection) => {
    connection
      .db("administrador")
      .command({ ping: 1 })
      .then((response) => {
        console.log("connected", response);
      });
  });
  client.close();
};

testConnection();

module.exports = client;
