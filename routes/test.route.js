const express = require("express");
const router = express.Router();
// const validator = require("../validators/auth.validator");
const model = require("../models/test.model");
const authModel = require("../models/auth.model.js")

router.use(express.json({
    type: "application/json"
}));

router.use(authModel.validateSession)

router.get("/:projectId/:groupId/:testId", (req, res, next) => {
    res.set("Content-Type", "application/json")
    next();
}, async (req, res, next) => {
    const {projectId, groupId, testId} = req.params
    let result = await model.getSteps(projectId, groupId, testId)
    res.send(result)
})

router.post("/:projectId/:groupId/:testId", (req, res, next) => {
    res.set("Content-Type", "application/json")
    next();
}, async (req, res, next) => {
    const {projectId, groupId, testId} = req.params
    const items = req.body
    await model.saveSteps(projectId, groupId, testId, items)
    next()
}, async (req, res, next) => {
    const {projectId, groupId, testId} = req.params
    let result = await model.getSteps(projectId, groupId, testId)
    res.send(result)
})

router.get("/:projectId/:groupId", (req, res, next) => {
    res.set("Content-Type", "application/json");
    next();
}, async (req, res, next) => {
    const {projectId, groupId} = req.params
    const {user} = req.session
    let result = await model.getSubTests(projectId, groupId, user)
    res.send(result)
})

// Deprecated
// router.get("/:projectId", (req, res, next) => {
//     res.set("Content-Type", "application/json");
//     next();
// }, model.getProjectTests)

router.post("/:projectId/:groupId", (req, res, next) => {
    res.set("Content-Type", "application/json");
    next();
}, async (req, res, next) => {
    const {projectId, groupId} = req.params
    const items = req.body 
    await model.saveAllTests(projectId, groupId, items)
    next()
}, async (req, res, next) => {
    const {projectId, groupId} = req.params
    const {user} = req.session
    let result = await model.getSubTests(projectId, groupId, user)
    res.send(result)
})

// Deprecated
// router.post("/:projectId", (req, res, next) => {
//     res.set("Content-Type", "application/json");
//     next();
// }, model.saveAllTests, model.getProjectTests)

    
module.exports = router;