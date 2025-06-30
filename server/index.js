// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Auth related API
app.use("/api/auth", require("./routes/auth"));

// All Events API
app.use("/api/events", require("./routes/events"));

app.get("/", (req, res) => res.send("Auth API Running"));

connectDB().then(() => {
    app.listen(5000, () => console.log("✅ Server running on port 5000"));
});
