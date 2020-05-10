const ObjectId = require("mongodb").ObjectId;
const usersModel = require('./users.model')
const mongo = require("../db");

const dbName = "app";

async function getAllProjects(req, res, next){
    const client = await mongo.getConnection();
    const db = client.db(dbName);
    const col = db.collection("projects");

    let userId = await usersModel.getUserIdByEmail(req.session.user)
    console.log(userId);
    
    let result = await col.find({userId: String(userId)}).toArray();
    client.close()
    res.send(result)
}

async function saveAllProjects(req, res, next){
    const items = req.body

    let userId = await usersModel.getUserIdByEmail(req.session.user)
console.log(userId);

    const client = await mongo.getConnection();
    const db = client.db(dbName);
    const col = db.collection("projects");

    let serverItems = await col.find({}).toArray()

    let newItems = items.filter((p) => {
        return p._id == null
    }).map((p) => {
        return {
            userId: String(userId),
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
    // client.close()
    next()
}

async function isUsersProject(email, projectId){

    let userId = await usersModel.getUserIdByEmail(email)
    if(userId){
        const client = await mongo.getConnection();
        const db = client.db(dbName);
        const col = db.collection("projects");

        let result = await col.find({
            _id: ObjectId(projectId),
            userId: String(userId)
        }).toArray()

        return result.length > 0
    }
    return false
}







module.exports = {
    getAllProjects,
    saveAllProjects,
    isUsersProject,
}