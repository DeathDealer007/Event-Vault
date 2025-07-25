const express = require("express");
const router = express.Router();

// ✅ Importing controller functions
const {
  createEvent,
  getAllEvents,
  registerParticipant,
  deleteEvent,
  updateEvent,
  togglePin,
} = require("./eventController");

// ✅ Importing middleware
const { userAuthenticationMiddleware } = require("../middleware");

// ✅ Admin check middleware
const adminCheck = (req, res, next) => {
  if (req.user?.email === "ankit19kumar2004@gmail.com") {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: "Unauthorized access — Admins only!",
  });
};

// ✅ PUBLIC ROUTES
router.get("/", getAllEvents);                         // Get all events
router.post("/participants", registerParticipant);     // Register a participant

// ✅ PROTECTED ROUTES (Require login)
router.post("/", userAuthenticationMiddleware, createEvent); // Create event

// ✅ ADMIN-ONLY ROUTES
router.delete("/:eventId", userAuthenticationMiddleware, adminCheck, deleteEvent);      // Delete event
router.put("/:eventId", userAuthenticationMiddleware, adminCheck, updateEvent);         // Update event
router.patch("/:eventId/pin-toggle", userAuthenticationMiddleware, adminCheck, togglePin); // Toggle pin status

// ✅ Export the router
module.exports = { eventRouter: router };
