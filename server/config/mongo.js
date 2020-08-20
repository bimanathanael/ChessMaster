const MongoClient = require("mongodb").MongoClient;
const dbName =
  process.env.dbName || process.env.NODE_ENV == "test"
    ? "chessMasterTest"
    : "chessMasterDB";
const url = process.env.URL || "mongodb://127.0.0.1:27017/";

const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect();

const db = client.db(dbName);

module.exports = db;
