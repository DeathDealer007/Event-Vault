// routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  registerParticipant,
} = require("./eventController");

router.post("/", createEvent); // POST /api/v1/event
router.get("/", getAllEvents); // GET /api/v1/event
router.post("/participants", registerParticipant); // POST /api/v1/event/participants

module.exports = { eventRouter: router };
