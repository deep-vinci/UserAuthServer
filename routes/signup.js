const path = require("path");
const express = require("express");
const supabase = require("../config/dbClient");

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "signup.html"));
});

router.post("/", async (req, res) => {
    
    const { email } = req.body;

    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email); // Filter by email

        if (error) throw error;
        
        if (data[0].email == email) {
            res.redirect("/signin");
        } else {
            res.redirect("/signup")
        }
        
    } catch (err) {
        console.error({ error: err.message });
    }

    
});

module.exports = router;

// app.get('/users', async (req, res) => {
//     try {
//       const { data, error } = await supabase
//         .from('users') // Replace with your table name
//         .select('*');

//       if (error) throw error;
//       res.json(data);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });
