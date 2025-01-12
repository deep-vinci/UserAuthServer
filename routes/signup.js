require('dotenv').config();

const path = require("path");

const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "signup.html"));
});

router.post("/", (req, res) => {
    res.redirect("/signin");
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
