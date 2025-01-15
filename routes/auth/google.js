require("dotenv");
const axios = require('axios');
const express = require('express')
const cookieParser = require('cookie-parser');
const userRepository = require("../../repositories/userRepository");
const SessionRepository = require("../../repositories/sessionRepository");
const { generateToken } = require("../../utils")
const routes = require("../../config/routes");

const router = express.Router();
router.use(cookieParser());


router.get('/', async (req, res) => {
    const code = req.query.code;
    const maxAge = 1 * 60 * 1000;
    const expireAt = new Date(new Date().getTime() + maxAge);
    const sessionToken = generateToken();

    // Exchange the authorization code for an access token
    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: 'http://localhost:3000/auth/google/callback',
            grant_type: 'authorization_code',
        });

        const { access_token } = response.data;

        // Use the access token to get user info
        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        
        const authId = userInfoResponse.data.id;
        const email = userInfoResponse.data.email;
        const profilePictureUrl = userInfoResponse.data.picture;

        const userExists = await userRepository.findUserByEmail(email);
        console.log(userInfoResponse.data.id)

        if (!userExists) {
            await userRepository.createUser(authId, email, "", "google", profilePictureUrl);
        }        

        await SessionRepository.createSession(email, sessionToken, expireAt);
        res.cookie("sessionToken", sessionToken, { httpOnly: true, secure: true, maxAge: maxAge });    
        res.redirect(routes.app);
    } catch (error) {
        console.error(error);
        res.status(500).send('Authentication failed');
    }
});

module.exports = router;