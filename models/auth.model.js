const MongoClient = require("mongodb").MongoClient;
const mongo = require("../db");
const nodemailer = require("nodemailer")
const uuidv4 = require("uuid").v4


const dbName = "app";

let transportSettings = {
    service: 'gmail',
    auth: {
        user: process.env.REPLY_EMAIL,
        pass: process.env.REPLY_PASSWORD
    }
}

let transporter = nodemailer.createTransport(transportSettings);

async function userExists(email){
    const client = await mongo.getConnection();

    const col = client.db("app").collection("users");
    let result = await col.find({
                            "email": email
                        }).toArray().catch(err => console.log(err));
    client.close();
    let nameExist = (result.length == 1);
    return nameExist;
}

async function isEmailConfActive(email){
    const client = await mongo.getConnection();

    const col = client.db("app").collection("confirmations");
    let result = await col.find({
                            "email": email,
                            "activeTill": {$gt: new Date().toISOString()}
                        }).toArray().catch(err => console.log(err));
    client.close();
    let activated = (result.length == 1)
    return activated;
}

async function addConfirmation(email, urlHash){
    const client = await mongo.getConnection();
    const col = client.db("app").collection("confirmations");
    let activeTill = new Date()
    activeTill.setHours(activeTill.getHours() + 2)
    col.insertOne({
        "email": email,
        "urlHash": urlHash,
        "aciveTill": activeTill
    });
    client.close()
    return
}

async function sendConfirmationEmail(email, hash, host){

    let mailOptions = {
        from: appConfig.REPLY_EMAIL,
        to: email,
        subject: 'Registration confirmation',
        text: `Please click this link ${host}/api/auth/activ/${hash}`
    };
    console.log(mailOptions)

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

async function isHashConfActive(urlHash){
    const client = await mongo.getConnection();
    const col = client.db("app").collection("confirmations");
    let result = await col.find({
        "urlHash": urlHash,
        "activeTill": {$gt: new Date().toISOString()}
    })
    client.close()
    return (result.length > 0) ? true : false
}

async function getConfirmedUserEmail(urlHash){
    const client = await mongo.getConnection();
    const col = client.db("app").collection("confirmations");
    let result = await col.findOne({"urlHash": urlHash})
    client.close()
    return result.email
}

async function activateUserAccount(email){
    const client = await mongo.getConnection();
    const col = client.db("app").collection("users");
    let result = await col.updateOne(
        {"email": email},
        {"$set": {"activated": true}}
    )
    client.close()
    return
}

async function removeConfirmation(email){
    const client = await mongo.getConnection();
    const col = client.db("app").collection("confirmations");
    col.deleteOne({
        "email": email
    })
    client.close()
    return
}

async function confirmUser(req, res, next){
    const {hash} = req.params
    const host = req.headers.host;
    let isUrlActive = await isHashConfActive(hash)
    if(!isUrlActive){
        let email = await getConfirmedUserEmail(hash)
        await activateUserAccount(email)
        removeConfirmation(email)
        res.status(200).send(`Account activated. Follow the link to sign in: ${host}/login`)
    } else {
        removeConfirmation(email)
        res.status(400).send(`No accaount to acctivate or activation link is outdated. Return to register: ${host}/register`)
    }
}

async function registerUser(req, res, next) {
    const {email, password} = req.body;
    const host = req.headers.host;
    let userExist = await userExists(email);
    if(!userExist){
        const client = await mongo.getConnection();
        const col = client.db("app").collection("users");
        await col.insertOne({
            "email": email,
            "password": password,
            "activated": false
        }).catch(err => console.log(err));
        client.close();
    }
    let activeConfirmation = await isEmailConfActive(email)
    if(!activeConfirmation){
        let urlHash
        urlHash = uuidv4()
        addConfirmation(email, urlHash)
        sendConfirmationEmail(email, urlHash, host)
    }
    res.status(200).send("Activation link was send to email")
}

async function loginUser(req, res, next) {
    const {email, password} = req.body;
    const client = await mongo.getConnection();
    console.log("Connected succesfully");

    const db = client.db(dbName);
    const col = db.collection("users");
    const arr = await
            col.find({
                "email": email,
                "password": password,
                "activated": true
            }).toArray()

    client.close();
    result = (arr.length == 1);

    if(result == true){
        req.session.user = email
        req.session.authenticated = true

        res.status(200).send({message: "Login successful"});
    } else {
        res.status(400).send({message: "Username or password is wrong"});
    }
}

async function logoutUser(req, res, next){
    req.session.destroy()
    res.send("logout success")
}

async function validateSession(req, res, next){
    if(req.session && req.session.authenticated && (await userExists(req.session.user))){
        next()
    } else {
        res.status(401)
        next()
    }
}

module.exports = {
    confirmUser,
    registerUser,
    loginUser,
    logoutUser,
    validateSession
}