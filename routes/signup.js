const path = require("path");
const express = require("express");
const bcrypt = require("bcryptjs");

const routes = require("../config/routes");
const UserRepository = require('../repositories/userRepository');


const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "signup.html"));
});

router.post("/", async (req, res) => {
    
    const { email, password } = req.body;

    try {
        const user = await UserRepository.findUserByEmail(email);
        if (user) res.redirect(routes.signup);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await UserRepository.createUser(email, hashedPassword);
        res.redirect(routes.signin);
    } catch (err) {
        console.error({ error: err.message });
    }
    
});

module.exports = router;

