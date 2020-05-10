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



async function getSteps(projectId, groupId, testId){
    const client = await mongo.getConnection();
    const db = client.db(dbName);
    const col = db.collection("tests");
    let result = await col.find({
        "projectId": projectId,
        "groupId": groupId,
        "_id": ObjectId(testId)
    }).toArray();
    client.close()
    return result[0].steps
}

async function saveSteps(projectId, groupId, testId, items){

    console.log("items",items);

    const client = await mongo.getConnection();
    const db = client.db(dbName);
    const col = db.collection("tests");

    console.log(projectId, groupId, testId);

    await col.updateOne({
        "projectId": projectId,
        "groupId": groupId,
        "_id": ObjectId(testId)
    },{$set: {steps: items}})
    client.close()
    return
}

async function getSubTests(projectId, groupId, userEmail){
    let result = []
    if(projectModel.isUsersProject(userEmail, projectId)){
        const client = await mongo.getConnection();
        const db = client.db(dbName);
        const col = db.collection("tests");
        result = await col.find({
            projectId: projectId,
            groupId: groupId
        }).toArray();
        client.close()
    }
    result = result.sort((a, b) => {
        return a.orderIdx - b.orderIdx
    });
    return result
}

async function saveAllTests(projectId, groupId, items){
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
            orderIdx: p.orderIdx,
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
            description: p.description,
            orderIdx: p.orderIdx
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
    return
}

module.exports = {
    // getProjectTests,
    getSubTests,
    saveAllTests,
    getSteps,
    saveSteps,
}