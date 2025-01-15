require("dotenv");
const axios = require('axios');
const express = require('express');
const cookieParser = require('cookie-parser');
const userRepository = require("../../repositories/userRepository");
const SessionRepository = require("../../repositories/sessionRepository");
const { generateToken } = require("../../utils");
const routes = require("../../config/routes");

const router = express.Router();
router.use(cookieParser());

router.get('/', async (req, res) => {
    const code = req.query.code;
    console.log(code)
    const maxAge = 1 * 60 * 1000; // 1 minute session expiration
    const expireAt = new Date(new Date().getTime() + maxAge);
    const sessionToken = generateToken();

    // Exchange the authorization code for an access token
    try {
        const response = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            code: code,
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:3000/auth/discord/callback',
            scope: 'identify email', // Requesting basic information
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const { access_token } = response.data;

        // Use the access token to get user info
        const userInfoResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        
        const authId = userInfoResponse.data.id;
        const email = userInfoResponse.data.email;
        const username = userInfoResponse.data.username;
        const avatarUrl = `https://cdn.discordapp.com/avatars/${authId}/${userInfoResponse.data.avatar}.png`;

        console.log(userInfoResponse.data);
        // Check if user exists in the database
        const userExists = await userRepository.findUserByEmail(email);
        console.log(userInfoResponse.data.id);

        if (!userExists) {
            await userRepository.createUser(authId, email, username, "discord", avatarUrl);
        }

        // Create session for the user
        await SessionRepository.createSession(email, sessionToken, expireAt);
        res.cookie("sessionToken", sessionToken, { httpOnly: true, secure: true, maxAge: maxAge });

        // Redirect to the app page after successful login
        res.redirect(routes.app);
    } catch (error) {
        console.error(error);
        res.status(500).send('Authentication failed');
    }
});

module.exports = router;
