const express = require("express");
const cookieParser = require('cookie-parser')
const crypto = require('crypto');

const db = require("./json-adapter");

const app = express();
app.use(cookieParser())

const port = 49152;


app.get("/", (req, res) => {
    // check for cookies if verified that cookie is valid than allow login
    console.log(req.cookies.sessionId)
    res.cookie("sessionId", crypto.randomUUID(), {
        maxAge: 1000 * 60 * 15
    });
    res.send("");
});

app.post("/signup", (req, res) => {
    // check for if email exists
    // if email exist then, send email already exist message
    // send cookie too with a validity of some time period
})

app.get("/signin", async (req, res) => {
    // console.log(db.read());
    res.send(await db.read());
    // check if cookie is not there
    // check for emails password, if the user password matches email pass than allow login

})


app.listen(port, () => {
    console.log(`listening at port ${port}`);
})