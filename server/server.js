const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "..", "public")));

const donationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const Donation = mongoose.model("Donation", donationSchema);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    });

app.post("/donate", async (req, res) => {
    const { name, email, amount } = req.body;
    if (!name || !email || !amount) {
        return res.status(400).json({ error: "All fields are required" });
    }
    try {
        const donation = new Donation({ name, email, amount });
        await donation.save();
        res.status(201).json({ message: "Donation received!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/donations", async (req, res) => {
    try {
        const donations = await Donation.find().sort({ date: -1 });
        res.json(donations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const ADMIN_USER = "admin";
const ADMIN_PASS = "password";

function authenticateAdmin(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== "Bearer admin-token") {
        return res.status(403).json({ error: "Unauthorized access" });
    }
    next();
}

app.post("/admin/login", (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        res.json({ message: "Login successful", token: "admin-token" });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
});

app.get("/admin/donations", authenticateAdmin, async (req, res) => {
    try {
        const donations = await Donation.find().sort({ date: -1 });
        res.json(donations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/admin/donations/:id", authenticateAdmin, async (req, res) => {
    try {
        await Donation.findByIdAndDelete(req.params.id);
        res.json({ message: "Donation record deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
