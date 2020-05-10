const ObjectId = require("mongodb").ObjectId;
const mongo = require("../db");
const projectModel = require("./project.model")

const dbName = "app";
const testCollection = "tests";

// Deprecated
// async function getProjectTests(req, res, next){
//     const {projectId} = req.params
//     const client = await mongo.getConnection();
//     const db = client.db(dbName);
//     const col = db.collection("tests");
//     let result = await col.find({
//         projectId: projectId,
//         groupId: "root"
//     }).toArray();
//     res.send(result)
// }

async function getSubTests(req, res, next){
    const {projectId, groupId} = req.params
    let result = []
    if(projectModel.isUsersProject(req.session.user, projectId)){
        const client = await mongo.getConnection();
        const db = client.db(dbName);
        const col = db.collection("tests");
        result = await col.find({
            projectId: projectId,
            groupId: groupId
        }).toArray();
        client.close()
    }
    res.send(result)
}

async function getSteps(req, res, next){
    const {projectId, groupId, testId} = req.params
    const client = await mongo.getConnection();
    const db = client.db(dbName);
    const col = db.collection("tests");
    let result = await col.find({
        "projectId": projectId,
        "groupId": groupId,
    }).toArray();
    client.close()
    res.send(result[0].steps)
}

async function saveSteps(req, res, next){
    const {projectId, groupId, testId} = req.params

    const items = req.body
    console.log("items",items);

    const client = await mongo.getConnection();
    const db = client.db(dbName);
    const col = db.collection("tests");

    console.log(projectId, groupId, testId);

    await col.updateOne({
        "projectId": projectId,
        "groupId": groupId,
    },{$set: {steps: items}})
    client.close()
    next()
}

async function saveAllTests(req, res, next){
    const {projectId, groupId} = req.params

    const items = req.body
    console.log("items",items);

    const client = await mongo.getConnection();
    const db = client.db(dbName);
    const col = db.collection("tests");

    let serverItems = await col.find({
        projectId: projectId,
        groupId: groupId
    }).toArray()

    let newItems = items.filter((p) => {
        return p._id == null
    }).map((p) => {
        return {
            name: p.name,
            description: p.description,
            projectId: p.projectId,
            groupId: p.groupId,
            steps: []
        }
    })
    console.log("toInsert", newItems)

    if(newItems.length > 0) col.insertMany(newItems)

    let existingItems = items.filter((p) => {
        return p._id != null
    })

    var toUpdate = existingItems.filter((obj) => {
        return serverItems.some((obj2) => {
            return obj._id == obj2._id;
        });
    });
    console.log("toUpdate", toUpdate)

    toUpdate.forEach(p => {
        col.updateOne({"_id": ObjectId(p._id)}, {$set: {
            name: p.name,
            description: p.description
        }})
    });

    var toDelete = serverItems.filter((obj) => {
        return !existingItems.some((obj2) => {
            return obj._id == obj2._id;
        });
    });
    console.log("toDelete", toDelete)

    toDelete.forEach(p => {
        col.deleteOne({_id: p._id})
    });
    // client.close()
    next()
}

module.exports = {
    // getProjectTests,
    getSubTests,
    saveAllTests,
    getSteps,
    saveSteps,
}