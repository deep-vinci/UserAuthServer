require('dotenv').config();
const path = require("path");

const express = require("express");
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const port = 3000 || process.env.PORT;

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // For URL-encoded form data
app.use(express.json()); // For JSON data (if applicable)

app.use(express.static(path.join(__dirname, "public")));

app.use('/demo', require('./routes/demo'));
app.use('/signup', require('./routes/signup'));
app.use('/signin', require('./routes/signin'));

app.get("/", (req, res) => {
    // check for cookies if verified that cookie is valid than allow login
    console.log(req.cookies.sessionId)
    res.cookie("sessionId", crypto.randomUUID(), {
        maxAge: 1000 * 60 * 15
    });
    res.send("");
});

app.post("/signin", (req, res) => {
    // check for if email exists
    // if email exist then, send email already exist message
    // send cookie too with a validity of some time period
})

app.listen(port, () => {
    console.log(`listening at port ${port}`);
})