const ObjectId = require("mongodb").ObjectId;
const mongo = require("../db");
const projectModel = require("./project.model")

const dbName = "app";

async function getProjectGroups(req, res, next){
    const {projectId} = req.params
    let result = []
    if(projectModel.isUsersProject(req.session.user, projectId)){
        const client = await mongo.getConnection();
        const db = client.db(dbName);
        const col = db.collection("groups");
        result = await col.find({
            projectId: projectId,
            groupId: "root"
        }).toArray();
        client.close()
    }
    res.send(result)
}

async function getSubGroups(req, res, next){
    const {projectId, groupId} = req.params
    let result = []
    if(projectModel.isUsersProject(req.session.user, projectId)){
        const client = await mongo.getConnection();
        const db = client.db(dbName);
        const col = db.collection("groups");
        result = await col.find({
            projectId: projectId,
            groupId: groupId
        }).toArray();
        client.close()
    }
    res.send(result)
}

async function saveAllGroups(req, res, next){
    const {projectId, groupId} = req.params

    console.log("saveGroups", projectId, groupId);

    const client = await mongo.getConnection();
    const db = client.db(dbName);
    const col = db.collection("groups");

    async function deleteGroup(projectId, id){
        console.log("Starting delete", projectId, id);
        let group = (await db.collection("groups").find({
            "projectId": String(projectId),
            "_id": ObjectId(id)
        }).toArray())[0]
        console.log("GROUP", group);

        let subgroups = (await db.collection("groups").find({
            "projectId": String(projectId),
            "groupId": String(id)
        }).toArray())
        console.log("SUBGROUPS", subgroups);

        await db.collection("tests").deleteMany({
            projectId: String(projectId),
            groupId: String(group._id)
        })
        await db.collection("groups").deleteOne({
            projectId: String(projectId),
            _id: ObjectId(group._id)
        })
        for(let subgroup of subgroups){
            await deleteGroup(projectId, subgroup._id)
        }
    }


    const items = req.body
    // console.log("items", items);


    let serverItems = await col.find({
        projectId: projectId,
        groupId: groupId
    }).toArray()
    // console.log("serverItems", serverItems);


    let newItems = items.filter((p) => {
        return p._id == null
    }).map((p) => {
        return {
            name: p.name,
            description: p.description,
            projectId: p.projectId,
            groupId: p.groupId,
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
    // console.log("toUpdate", toUpdate);


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
    console.log("toDelete", toDelete);

    toDelete.forEach(p => {
        deleteGroup(p.projectId, p._id)
    });
    // client.close()
    // res.status(200)
    next()
}

async function getGroupBreadcrumb(req, res, next){
    console.log("GROUP BREAD");

    const {projectId, groupId} = req.params
    res.send(await getBreadcrumb(projectId, groupId))
}

async function getTestBreadcrumb(req, res, next){
    console.log("TEST BREAD");
    const {projectId, groupId, testId} = req.params
    res.send(await getBreadcrumb(projectId, groupId, testId))
}

async function getBreadcrumb(projectId, groupId, testId){
    let breadcrumb = []
    const client = await mongo.getConnection();
    const db = client.db(dbName);

    if(groupId != "root"){
        if(testId != null){
            let test = (await db.collection("tests").find({
                projectId: String(projectId),
                _id: ObjectId(testId)
            }).toArray())[0]
            breadcrumb.push({
                name: test.name,
                // projectId: test.projectId,
                // groupId: test._id
            })
        }
        let group = (await db.collection("groups").find({
            projectId: String(projectId),
            _id: ObjectId(groupId)
        }).toArray())[0]
        while(group && group.groupId != "root"){

            breadcrumb.push({
                name: group.name,
                projectId: group.projectId,
                groupId: group._id
            })

            group = (await db.collection("groups").find({
                projectId: String(projectId),
                _id: ObjectId(group.groupId)
            }).toArray())[0]
        }
        if(group) breadcrumb.push({
            name: group.name,
            projectId: group.projectId,
            groupId: group._id
        })
    } else {
        // let group = (await db.collection("groups").find({
        //     projectId: String(projectId),
        //     groupId: String(groupId)
        // }).toArray())[0]
        // if(group) breadcrumb.push({
        //     name: group.name
        // })
    }

    let project = (await db.collection("projects").find({
        _id: ObjectId(projectId)
    }).toArray())[0]
    if(project) breadcrumb.push({
        name: project.name,
        projectId: project._id,
        groupId: "root"
    })
    client.close()
    return breadcrumb.reverse()
}

module.exports = {
    getProjectGroups,
    getSubGroups,
    saveAllGroups,
    getGroupBreadcrumb,
    getTestBreadcrumb,
}