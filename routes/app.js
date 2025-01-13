const path = require("path");

const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser');

const SessionRepository = require("../repositories/sessionRepository");

router.use(cookieParser());


router.get("/", async (req, res) => {
    try {
        const { sessionToken } = req.cookies;

        if (!sessionToken) {
            // on no session, redirect to home page
            return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
        }

        // Verify the session token
        const session = await SessionRepository.verifySession(sessionToken);

        if (session) {
            return res.sendFile(path.join(__dirname, "..", "public", "dashboard.html"));
        } else {
            return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
        }
    } catch (error) {
        console.error("Error during session verification:", error.message);
        return res.status(500).sendFile(path.join(__dirname, "..", "public", "error.html"));
    }
});

module.exports = router;