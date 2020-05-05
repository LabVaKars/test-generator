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
}, model.getAllProjects)

router.post("/projects", (req, res, next) => {
    // res.set("Content-Type", "application/json");
    next();
}, model.saveAllProjects, model.getAllProjects)

// router.get("/get/:id", (req, res, next) => {
//     res.set("Content-Type", "application/json");
//     next();
// }, model.getTest)

// router.get("/all/:id?", (req, res, next) => {
//     res.set("Content-Type", "application/json");
//     next();
// }, model.getTests)

// router.post("/update/:id", (req, res, next) => {
//     res.set("Content-Type", "application/json");
//     next();
// }, model.updateTest)

// router.delete("/remove/:id", (req, res, next) => {
//     res.set("Content-Type", "application/json");
//     next();
// }, model.removeTest)
    
module.exports = router;