const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const { ObjectId } = require("mongodb");

// get events
router.get("/", async (req, res) => {
    const search = req.query.search || "";
    const filter = req.query.filter || "all";

    const now = new Date();
    let startDate = null;
    let endDate = null;

    switch (filter) {
        case "today":
            startDate = new Date(now.setHours(0, 0, 0, 0));
            endDate = new Date(now.setHours(23, 59, 59, 999));
            break;
        case "this-week":
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            startOfWeek.setHours(0, 0, 0, 0);

            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(endOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999);

            startDate = startOfWeek;
            endDate = endOfWeek;
            break;
        case "last-week":
            const startLastWeek = new Date(now);
            startLastWeek.setDate(now.getDate() - now.getDay() - 7);
            startLastWeek.setHours(0, 0, 0, 0);

            const endLastWeek = new Date(startLastWeek);
            endLastWeek.setDate(endLastWeek.getDate() + 6);
            endLastWeek.setHours(23, 59, 59, 999);

            startDate = startLastWeek;
            endDate = endLastWeek;
            break;
        case "this-month":
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
            break;
        case "last-month":
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
            break;
    }

    const db = getDB();
    const collection = db.collection("events");

    // Convert text search + date range into a query
    const query = {
        title: { $regex: search, $options: "i" },
    };

    if (startDate && endDate) {
        query.date = {
            $gte: startDate.toISOString().split("T")[0],
            $lte: endDate.toISOString().split("T")[0],
        };
    }

    const events = await collection.find(query).toArray();
    res.json(events);
});

// post events
router.post("/", async (req, res) => {
    const { title, name, email, date, time, location, description } = req.body;
    if (!title || !name || !date || !time || !location || !description) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newEvent = {
        title,
        name,
        email,
        date,
        time,
        location,
        description,
        attendeeCount: 0,
    };

    const result = await getDB().collection("events").insertOne(newEvent);
    res.status(201).json({ message: "Event added", insertedId: result.insertedId });
});

//   update event attendee count
router.patch("/:id/join", async (req, res) => {
    const eventId = req.params.id;
    const userEmail = req.headers.email;

    if (!userEmail) return res.status(401).json({ error: "Missing user email" });

    const db = getDB();
    const eventsCol = db.collection("events");

    // check if user already joined
    const event = await eventsCol.findOne({ _id: new ObjectId(eventId) });
    if (!event) return res.status(404).json({ error: "Event not found" });

    if (event.joinedEmails?.includes(userEmail)) {
        return res.status(400).json({ error: "You already joined this event" });
    }

    // update attendee count and track joiners
    const updated = await eventsCol.updateOne(
        { _id: new ObjectId(eventId) },
        {
            $inc: { attendeeCount: 1 },
            $addToSet: { joinedEmails: userEmail }, // prevent duplicate
        }
    );

    res.json({ message: "Joined successfully" });
});

//   update event data , delete event
router.get("/my", async (req, res) => {
    const email = req.query.email;
    if (!email) return res.status(400).json({ error: "Email required" });

    const events = await getDB()
        .collection("events")
        .find({ email: email })
        .toArray();

    res.json(events);
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const result = await getDB()
        .collection("events")
        .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
        res.json({ message: "Deleted successfully" });
    } else {
        res.status(404).json({ error: "Event not found" });
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { title, date, time, location, description } = req.body;

    const result = await getDB()
        .collection("events")
        .updateOne(
            { _id: new ObjectId(id) },
            { $set: { title, date, time, location, description } }
        );

    res.json({ message: "Updated successfully" });
});

module.exports = router;
