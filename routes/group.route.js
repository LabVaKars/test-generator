const express = require("express");
const router = express.Router();
// const validator = require("../validators/auth.validator");
const model = require("../models/group.model");
const authModel = require("../models/auth.model.js")


router.use(express.json({
    type: "application/json"
}));

router.use(authModel.validateSession)

// Breadcrumbs

router.get("/breadcrumb/:projectId/:groupId/:testId", (req, res, next) => {
    res.set("Content-Type", "application/json")
    next()
}, async (req, res, next) => {
    let {projectId, groupId, testId} = req.params
    let result = await model.getTestBreadcrumb(projectId, groupId, testId)
    res.send(result)
})

router.get("/breadcrumb/:projectId/:groupId", (req, res, next) => {
    res.set("Content-Type", "application/json")
    next()
}, async (req, res, next) => {
    let {projectId, groupId} = req.params
    let result = await model.getGroupBreadcrumb(projectId, groupId)
    res.send(result)
})

// Group path

router.get("/:projectId/:groupId", (req, res, next) => {
    res.set("Content-Type", "application/json");
    next();
}, async (req, res, next) => {
    let {projectId, groupId} = req.params
    let {user} = req.session
    let result = await model.getSubGroups(projectId, groupId, user)
    res.send(result)
})

router.get("/:projectId", (req, res, next) => {
    res.set("Content-Type", "application/json");
    next();
}, async (req, res, next) => {
    let {projectId} = req.params
    let {user} = req.session
    let result = await model.getProjectGroups(projectId, user)
    res.send(result)
})

router.post("/:projectId/:groupId", (req, res, next) => {
    res.set("Content-Type", "application/json");
    next();
}, async (req, res, next) => {
    let {projectId, groupId} = req.params
    let items = req.body
    await model.saveAllGroups(projectId, groupId, items)
    next()
}, async (req, res, next) => {
    let {projectId, groupId} = req.params
    let {user} = req.session
    let result = await model.getSubGroups(projectId, groupId, user)
    res.send(result)
})

router.post("/:projectId", (req, res, next) => {
    res.set("Content-Type", "application/json");
    next();
}, async (req, res, next) => {
    let {projectId, groupId} = req.params
    let items = req.body
    await model.saveAllGroups(projectId, groupId, items)
    next()
}, async (req, res, next) => {
    let {projectId} = req.params
    let {user} = req.session
    let result = await model.getProjectGroups(projectId, user)
    res.send(result)
})


    
module.exports = router;