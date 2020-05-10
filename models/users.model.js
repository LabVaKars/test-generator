const MongoClient = require("mongodb").MongoClient;
const mongo = require("../db");

async function getUserIdByEmail(email){
    const client = await mongo.getConnection();
    const db = client.db("app");
    const col = db.collection("users");
    let result = await col.find({email: email}).toArray()
    if(result && result.length > 1) return result[0]._id
}

module.exports = {
    getUserIdByEmail
}