const express = require("express");
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  registerParticipant,
  deleteEvent,
  updateEvent,
  togglePin,
} = require("../../api/v1/event/eventController");

const { userAuthenticationMiddleware } = require("../../middleware");

// Middleware to check if user is admin
const adminCheck = (req, res, next) => {
  if (req.user?.email === "ankit19kumar2004@gmail.com") {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: "Unauthorized access — Admins only!",
  });
};

// ✅ Public Routes
router.get("/", getAllEvents);
router.post("/participants", registerParticipant);

// ✅ Protected Routes (require login)
router.post("/", userAuthenticationMiddleware, createEvent);

// ✅ Admin-only Routes
router.delete("/:eventId", userAuthenticationMiddleware, adminCheck, deleteEvent);
router.put("/:eventId", userAuthenticationMiddleware, adminCheck, updateEvent);
router.patch("/:eventId/pin-toggle", userAuthenticationMiddleware, adminCheck, togglePin);

module.exports = { eventRouter: router };
