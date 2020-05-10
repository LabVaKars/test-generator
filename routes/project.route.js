const express = require("express");
const router = express.Router();
// const validator = require("../validators/auth.validator");
const model = require("../models/project.model");
const authModel = require("../models/auth.model.js")


router.use(express.json({
    type: "application/json"
}));

router.use(authModel.validateSession)

router.get("/projects", (req, res, next) => {
    // res.set("Content-Type", "application/json");
    next();
}, async (req, res, next) => {
    let {user} = req.session
    let result = await model.getAllProjects(user)
    res.send(result)
})

router.post("/projects", (req, res, next) => {
    // res.set("Content-Type", "application/json");
    next();
}, async (req, res, next) => {
    let {user} = req.session
    let items = req.body
    await model.saveAllProjects(user, items)
    next()
}, async (req, res, next) => {
    let {user} = req.session
    let result = await model.getAllProjects(user)
    res.send(result)
})
    
module.exports = router;