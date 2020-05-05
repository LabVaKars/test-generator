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
}, model.getSteps)

router.post("/:projectId/:groupId/:testId", (req, res, next) => {
    res.set("Content-Type", "application/json")
    next();
}, model.saveSteps, model.getSteps)

router.get("/:projectId/:groupId", (req, res, next) => {
    res.set("Content-Type", "application/json");
    next();
}, model.getSubTests)

// Deprecated
// router.get("/:projectId", (req, res, next) => {
//     res.set("Content-Type", "application/json");
//     next();
// }, model.getProjectTests)

router.post("/:projectId/:groupId", (req, res, next) => {
    res.set("Content-Type", "application/json");
    next();
}, model.saveAllTests, model.getSubTests)

// Deprecated
// router.post("/:projectId", (req, res, next) => {
//     res.set("Content-Type", "application/json");
//     next();
// }, model.saveAllTests, model.getProjectTests)

    
module.exports = router;