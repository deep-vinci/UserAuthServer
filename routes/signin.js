const path = require("path");
const express = require("express");
const bcrypt = require("bcryptjs");
const supabase = require("../config/dbClient");
const routes = require("../config/routes");
const UserRepository = require("../repositories/userRepository");
const SessionRepository = require("../repositories/sessionRepository");
const { generateToken } = require("../utils")


const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "signin.html"));
});

router.post("/", async (req, res) => {
        
    const { email, password } = req.body;
    const maxAge = 1 * 60 * 1000;
    const expireAt = new Date(new Date().getTime() + maxAge);
    const sessionToken = generateToken();

    try {
        const user = await UserRepository.findUserByEmail(email);
        const passwordCompareBool = await bcrypt.compare(password, user.password);

        if (user && passwordCompareBool) {
            // login
            console.log("user authenticated")
            await SessionRepository.createSession(user.email, sessionToken, expireAt)
            res.cookie("sessionToken", sessionToken, { httpOnly: true, secure: true, maxAge: maxAge });
            res.redirect(routes.app);
        } else {
            // wrong credentials
            console.log("user not authenticated")
            res.redirect(routes.signin);
        }     
        
    } catch (err) {
        console.error({ error: err.message });
    }

});

module.exports = router;

