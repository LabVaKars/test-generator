const express = require("express")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const cors = require("cors");
const path = require("path")
const app = express();
const assert = require("assert");
if(process.env.NODE_ENV !== 'production') require('dotenv').config()

const authModel = require("./models/auth.model")

const authRouter = require("./routes/auth.route")
const testRouter = require("./routes/test.route")
const groupRouter = require("./routes/group.route")
const projectRouter = require("./routes/project.route")

let port = process.env.PORT || 3000

const sessionStore = new MongoStore({
    url: process.env.MONGO_URL,
    dbName: "app",
    collection: "sessions"
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {expires: new Date(Date.now() + 1000*60*60) },
    store: sessionStore
}))

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')))



app.use("/api/auth", authRouter);
app.use("/api/test", testRouter);
app.use("/api/group", groupRouter);
app.use("/api/project", projectRouter);

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})

app.get("/*", authModel.validateSession, (req, res) => {
    // res.status(200).send("Successful authentication")
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})



// app.get("/", (req, res) => {
//     res.send("Hello, worlddd");
// });
console.log(`Running on port ${port}`);


app.listen(port);