const path = require("path");
const express = require("express");
const bcrypt = require("bcryptjs");
const supabase = require("../config/dbClient");
const routes = require("../config/routes");
const { generateToken } = require("../utils")

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "signin.html"));
});

router.post("/", async (req, res) => {
        
    const { email, password } = req.body;
    const sessionToken = generateToken();

    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email); // Filter by email
        
        if (error) throw error;

        if (data.length == 0) {
            // no email found
            res.redirect(routes.signup)
        } else {
            const passowrdCompare = await bcrypt.compare(password, data[0].password);

            if (data[0].email == email && passowrdCompare) {
                // user already present
                
                // const { data, error } = await supabase
                //     .from('session_table')
                //     .insert([{ user_id: data[0].email, session_token: sessionToken }])
        
                // if (error) throw error;
                res.cookie('session_token', sessionToken , { maxAge: 100000, httpOnly: true });
                res.redirect(routes.app);
            } else {
                res.redirect(routes.signup)
            }

        }
        
    } catch (err) {
        console.error({ error: err.message });
    }

});

module.exports = router;

