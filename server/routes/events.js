const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const { ObjectId } = require("mongodb");

// get events
router.get("/", async (req, res) => {
  const events = await getDB().collection("events").find().toArray();
  res.json(events);
});

// post events
router.post("/", async (req, res) => {
    const { title, name, date, time, location, description } = req.body;
    if (!title || !name || !date || !time || !location || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    const newEvent = {
      title,
      name,
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

module.exports = router;
