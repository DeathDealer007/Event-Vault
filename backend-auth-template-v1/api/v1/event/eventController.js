// controllers/eventController.js
const { EventModel } = require("../../../models/eventModel"); // ✅ Import Event model

const createEvent = async (req, res) => {
  try {
    const event = new EventModel(req.body); // ✅ Create Mongoose doc
    await event.save(); // ✅ Save to DB

    console.log("✅ Event Saved:", event); // Debug log
    res.status(201).json({ success: true, event });
  } catch (err) {
    console.error("❌ Error saving event:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (err) {
    console.error("❌ Error fetching events:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

const registerParticipant = async (req, res) => {
  try {
    const { eventId, name, email, phone, college, role, motivation } = req.body;

    // For now, just log the registration
    console.log("✅ Participant Registration:", {
      eventId,
      name,
      email,
      phone,
      college,
      role,
      motivation,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      participant: { name, email, eventId },
    });
  } catch (err) {
    console.error("❌ Error registering participant:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createEvent, getAllEvents, registerParticipant };
