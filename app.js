const express = require("express");

const app = express();


// make it dynamic so it can connnect to any database, use a module and import that as an function
app.get("/", (req, res) => {
    // check for cookies if verified that cookie is valid than allow login
});

app.post("/signup", (req, res) => {
    // check for if email exists
    // if email exist then, send email already exist message
    // send cookie too with a validity of some time period
})

app.post("/signin", (req, res) => {
    // check if cookie is not there
    // check for emails password, if the user password matches email pass than allow login
})


app.listen(343, () => {
    console.log("listening at port 343");
})