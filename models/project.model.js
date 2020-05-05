const ObjectId = require("mongodb").ObjectId;
const mongo = require("../db");

const dbName = "app";
// const testCollection = "tests";
const groupsCollection = "groups";

async function getAllProjects(req, res, next){
    const client = await mongo.getConnection();
    const db = client.db(dbName);
    const col = db.collection("projects");
    let result = await col.find({}).toArray();
    res.send(result)
}

async function saveAllProjects(req, res, next){
    const items = req.body

    const client = await mongo.getConnection();
    const db = client.db(dbName);
    const col = db.collection("projects");

    let serverItems = await col.find({}).toArray()

    let newItems = items.filter((p) => {
        return p._id == null
    }).map((p) => {
        return {
            name: p.name,
            baseUrl: p.baseUrl
        }
    })

    if(newItems.length > 0) col.insertMany(newItems)

    let existingItems = items.filter((p) => {
        return p._id != null
    })

    var toUpdate = existingItems.filter((obj) => {
        return serverItems.some((obj2) => {
            return obj._id == obj2._id;
        });
    });

    toUpdate.forEach(p => {
        col.updateOne({"_id": ObjectId(p._id)}, {$set: {
            name: p.name,
            baseUrl: p.baseUrl
        }})
    });

    var toDelete = serverItems.filter((obj) => {
        return !existingItems.some((obj2) => {
            return obj._id == obj2._id;
        });
    });

    toDelete.forEach(async (p) => {
        await col.deleteOne({_id: p._id})
        await db.collection("groups").deleteMany({
            projectId: String(p._id)
        })
        await db.collection("tests").deleteMany({
            projectId: String(p._id)
        })
    });

    next()
}







module.exports = {
    getAllProjects,
    saveAllProjects,
}