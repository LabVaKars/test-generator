const express = require("express");
const router = express.Router();
// const validator = require("../validators/auth.validator");
const model = require("../models/group.model");
const authModel = require("../models/auth.model.js")


router.use(express.json({
    type: "application/json"
}));

router.use(authModel.validateSession)

router.get("/breadcrumb/:projectId/:groupId/:testId", (req, res, next) => {
    res.set("Content-Type", "application/json")
    next()
}, model.getTestBreadcrumb)

router.get("/breadcrumb/:projectId/:groupId", (req, res, next) => {
    res.set("Content-Type", "application/json")
    next()
}, model.getGroupBreadcrumb)

router.get("/:projectId/:groupId", (req, res, next) => {
    res.set("Content-Type", "application/json");
    next();
}, model.getSubGroups)

router.get("/:projectId", (req, res, next) => {
    res.set("Content-Type", "application/json");
    next();
}, model.getProjectGroups)

router.post("/:projectId/:groupId", (req, res, next) => {
    res.set("Content-Type", "application/json");
    next();
}, model.saveAllGroups, model.getSubGroups)

router.post("/:projectId", (req, res, next) => {
    res.set("Content-Type", "application/json");
    next();
}, model.saveAllGroups, model.getProjectGroups)


    
module.exports = router;