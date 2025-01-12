const path = require("path");

const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "signin.html"));
});

router.post("/", (req, res) => {
    res
});

module.exports = router;

