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
    app.get(/^\/(?!donations|admin\/login|admin\/donations|admin\/analytics).*/, (req, res) => {
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
        const {
            page = 1,
            limit = 10,
            search = "",
            sortBy = "date",
            order = "desc",
            minAmount,
            maxAmount,
            startDate,
            endDate
        } = req.query;

        const query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ];
        }

        if (minAmount || maxAmount) {
            query.amount = {};
            if (minAmount) query.amount.$gte = Number(minAmount);
            if (maxAmount) query.amount.$lte = Number(maxAmount);
        }

        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        const sortOrder = order === "asc" ? 1 : -1;
        const skip = (Number(page) - 1) * Number(limit);

        const [donations, total] = await Promise.all([
            Donation.find(query)
                .sort({ [sortBy]: sortOrder })
                .skip(skip)
                .limit(Number(limit)),
            Donation.countDocuments(query)
        ]);

        res.json({
            donations,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit))
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch donations" });
    }
});

app.get("/admin/donations/export", authenticateAdmin, async (req, res) => {
    try {
        const donations = await Donation.find().sort({ date: -1 });

        const header = "Name,Email,Amount,Date\n";
        const rows = donations
            .map(
                (d) =>
                    `"${d.name}","${d.email}",${d.amount},"${d.date.toISOString()}"`
            )
            .join("\n");

        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=donations.csv"
        );
        res.send(header + rows);
    } catch (err) {
        res.status(500).json({ error: "Export failed" });
    }
});

app.get("/admin/analytics", authenticateAdmin, async (req, res) => {
    try {
        const [totalStats, monthly, topDonors] = await Promise.all([
            Donation.aggregate([
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: "$amount" },
                        count: { $sum: 1 }
                    }
                }
            ]),
            Donation.aggregate([
                {
                    $group: {
                        _id: { year: { $year: "$date" }, month: { $month: "$date" } },
                        total: { $sum: "$amount" },
                        count: { $sum: 1 }
                    }
                },
                { $sort: { "_id.year": -1, "_id.month": -1 } },
                { $limit: 12 }
            ]),
            Donation.aggregate([
                {
                    $group: {
                        _id: "$email",
                        name: { $first: "$name" },
                        total: { $sum: "$amount" }
                    }
                },
                { $sort: { total: -1 } },
                { $limit: 5 }
            ])
        ]);

        res.json({
            totalAmount: totalStats[0]?.totalAmount || 0,
            totalCount: totalStats[0]?.count || 0,
            monthly,
            topDonors
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch analytics" });
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
