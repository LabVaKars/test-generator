const ObjectId = require("mongodb").ObjectId;
const mongo = require("../db");
const groupModel = require("./group.model")
const testModel = require("./test.model")

const dbName = "app";

async function getGeneratedCode(projectId, userEmail){

    let code = `module.exports = {\n`

    let projectGroups = await groupModel.getProjectGroups(projectId, userEmail)
    // console.log(projectGroups);
    projectGroups.forEach(async (g, i) => {
        code += `"${i+1}. ${g.name} - ${g.description}": function(browser){\n`
        code += (await recSubGroup(g.projectId, g.groupId, userEmail))
        code += '}\n'

    })
    

    code += `}`
    return code
}

async function recSubGroup(projectId, groupId, userEmail){
    console.log("recSubGroup");
    let code = ``
    let subGroups = await groupModel.getSubGroups(projectId, groupId, userEmail)
    subGroups.forEach(async (g) => {
        code += (await recSubGroup(g.projectId, g.groupId, userEmail))
    })
    let subTests = await testModel.getSubTests(projectId, groupId, userEmail)
    subTests.forEach(async (t) => {
        code += (await generateTestCode(t.projectId, t.groupId))
    })
    return code
}

async function generateTestCode(projectId, groupId){
    console.log("generateTestCode");
    let steps = await testModel.getSteps(projectId, groupId)
    let code = ``;
    steps.forEach((s,i) => {
        code += `${i},`
    })
    return code
}

module.exports = {
    getGeneratedCode,
}