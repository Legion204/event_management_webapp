// server/controllers/authController.js
const { getDB } = require("../db");
const { hashPassword } = require("../utils/hash");
const crypto = require("crypto");

const users = () => getDB().collection("users");

const register = async (req, res) => {
    const { name, email, password, photoURL } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "All fields required" });

    const exists = await users().findOne({ email });
    if (exists) return res.status(409).json({ error: "Email already exists" });

    const hashed = hashPassword(password);
    await users().insertOne({ name, email, password: hashed, photoURL });
    res.status(201).json({ message: "Registered successfully" });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await users().findOne({ email });
    if (!user || user.password !== hashPassword(password)) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = crypto.randomBytes(16).toString("hex"); // Simple token
    await users().updateOne({ email }, { $set: { token } });

    res.json({ token, user: { name: user.name, email, photoURL: user.photoURL } });
};

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const user = await users().findOne({ token });
    if (!user) return res.status(401).json({ error: "Invalid token" });

    req.user = user;
    next();
};

module.exports = { register, login, authMiddleware };
