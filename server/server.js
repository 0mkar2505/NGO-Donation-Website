const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const publicDir = path.join(__dirname, "..", "public");
const buildDir = path.join(publicDir, "build");

if (require("fs").existsSync(buildDir)) {
    app.use(express.static(buildDir));
    app.get(/^\/(?!donations|admin\/login|admin\/donations).*/, (req, res) => {
        res.sendFile(path.join(buildDir, "index.html"));
    });
} else {
    app.use(express.static(publicDir));
}

const donationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const Donation = mongoose.model("Donation", donationSchema);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection failed:", err.message));

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: "Too many login attempts. Try again later." }
});

const donateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: { error: "Too many donation attempts. Try again later." }
});

function authenticateAdmin(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ error: "Unauthorized" });
    }
}

app.post("/donate", donateLimiter, async (req, res) => {
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

app.post("/admin/login", loginLimiter, async (req, res) => {
    const { username, password } = req.body;
    const validUser = username === process.env.ADMIN_USERNAME;
    const validPass = process.env.ADMIN_PASSWORD_HASH
        ? await bcrypt.compare(password || "", process.env.ADMIN_PASSWORD_HASH)
        : false;
    if (validUser && validPass) {
        const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
            expiresIn: "2h"
        });
        res.json({ message: "Login successful", token });
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
