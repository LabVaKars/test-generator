const express = require("express");
const router = express.Router();
const authValidator = require("../validators/auth.validator").validateAuth;
const authModel = require("../models/auth.model");

router.use(express.json({
    type: "application/json"
}));

router.post("/register", (req, res, next) => {
    console.log("/register")
    res.set("Content-Type", "application/json");
    next();
}, authValidator, authModel.registerUser)
    
router.get("/activ/:hash", (req, res, next) => {
    console.log("/activ")
    res.set("Content-Type", "application/json")
    next()
}, authModel.confirmUser )

router.post("/login", (req, res, next) => {
    res.set("Content-Type", "application/json");
    next();
}, authValidator, authModel.loginUser)

router.post("/logout", (req, res, next) => {
    res.set("Content-Type", "application/json");
    next();
}, authModel.logoutUser)

router.get("/check/session", authModel.validateSession, (req, res, next) => {
    if(res.statusCode != 401){
        res.status(200).send("Successful authentication")
    } else {
        res.send("Authentication failed")
    }
})

module.exports = router;