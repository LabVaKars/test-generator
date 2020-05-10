const express = require("express");
const router = express.Router();
// const validator = require("../validators/auth.validator");
const model = require("../models/generate.model");
const authModel = require("../models/auth.model.js")

router.use(express.json({
    type: "application/json"
}));

router.use(authModel.validateSession)

router.get("/project/:projectId", (req, res, next) => {
    console.log('/generate/project');
    res.set("Content-Type", "application/json")
    next();
}, async (req, res, next) => {
    let {projectId} = req.params
    let {user} = req.session
    let result = await model.getGeneratedCode(projectId, user)
    res.send(result)
})
    
module.exports = router;