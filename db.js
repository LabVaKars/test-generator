if(process.env.NODE_ENV !== 'production') require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;


async function getConnection() {
    const client = await MongoClient
                        .connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
                        .catch(err => {
                            console.log(err);
                            res.status(503).send({message: "Error connecting to database"});
                        });
    return client
}



module.exports = {
    getConnection
}