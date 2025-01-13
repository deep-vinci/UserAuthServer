const path = require("path");
const express = require("express");
const bcrypt = require("bcryptjs");
const supabase = require("../config/dbClient");
const routes = require("../config/routes");

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "signup.html"));
});

router.post("/", async (req, res) => {
    
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password, salt);

    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email); // Filter by email
        
        if (error) throw error;

        if (data.length == 0) {
            // no email found
            const { data, error } = await supabase
                .from('users')
                .insert([{ email: email, password: securePassword }])

            if(error) throw error;
            res.redirect(routes.signin)
        } else {

            if (data[0].email == email) {
                // user already present
                res.redirect(routes.signin);
            } else {
                res.redirect(routes.signup)
            }

        }
        
    } catch (err) {
        console.error({ error: err.message });
    }

    
});

module.exports = router;

