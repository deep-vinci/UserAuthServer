const path = require("path");
const express = require("express");
const supabase = require("../config/dbClient");
const routes = require("../config/routes");

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "signup.html"));
});

router.post("/", async (req, res) => {
    
    const { email, password } = req.body;

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
                .insert([{ email, password }])

            res.redirect(routes.signin)
        } else {

            if (data[0].email == email && String(data[0].password) == password) {
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

