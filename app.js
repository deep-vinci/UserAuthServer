const express = require("express");
const cookieParser = require('cookie-parser')
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const demo = require('./routes/demo')
const signup = require('./routes/signup')

const port = 49152;

const app = express();
app.use(cookieParser())
app.use(express.urlencoded({ extended: true })); // For URL-encoded form data
app.use(express.json()); // For JSON data (if applicable)

// Initialize Supabase client
const supabaseUrl = 'https://sjzennjjxtdpwupikymd.supabase.co';
const supabaseKey = '';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.static(path.join(__dirname, "public")));
app.use('/demo', demo);
app.use('/signup', signup);

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

app.post("/signup", async (req, res) => {
    console.log(req.body)
    // console.log("db.read()");
    // res.send(await db.read());
    // check if cookie is not there
    // check for emails password, if the user password matches email pass than allow login
    // await db.read()
    res.status(201).json({
        message: 'User created successfully!',
    });
})


app.listen(port, () => {
    console.log(`listening at port ${port}`);
})