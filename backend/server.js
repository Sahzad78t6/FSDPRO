require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { OAuth2Client } = require("google-auth-library");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Successfully connected to MongoDB Atlas"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

const client = new OAuth2Client("1004628707373-ohhjad7s8guhdr4bprbrdn959dq23gh5.apps.googleusercontent.com");

app.post("/auth/google", async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "1004628707373-ohhjad7s8guhdr4bprbrdn959dq23gh5.apps.googleusercontent.com",
        });

        const payload = ticket.getPayload();

        const user = {
            name: payload.name,
            email: payload.email,
            picture: payload.picture
        };

        console.log("User:", user);

        res.json({ success: true, user });

    } catch (err) {
        console.log(err);
        res.status(401).json({ error: "Invalid token" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});