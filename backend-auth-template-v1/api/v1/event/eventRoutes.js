// routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  registerParticipant,
  deleteEvent, // ✅ add this!
} = require("./eventController");

router.post("/", createEvent);
router.get("/", getAllEvents);
router.post("/participants", registerParticipant);
router.delete("/:id", deleteEvent); // ✅ now this works

module.exports = { eventRouter: router };
