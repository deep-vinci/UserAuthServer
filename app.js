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

app.use("/", require("./routes/app"));
app.use('/demo', require('./routes/demo'));
app.use('/signup', require('./routes/signup'));
app.use('/signin', require('./routes/signin'));

app.listen(port, () => {
    console.log(`listening at port ${port}`);
})