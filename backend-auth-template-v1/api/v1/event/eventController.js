const { EventModel } = require("../../../models/eventModel");

// ✅ Create new Event
const createEvent = async (req, res) => {
  try {
    const event = new EventModel(req.body);
    await event.save();
    console.log("✅ Event Saved:", event);
    res.status(201).json({ success: true, event });
  } catch (err) {
    console.error("❌ Error saving event:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get all events: pinned first, then latest created
const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find().sort({ isPinned: -1, createdAt: -1 });
    res.status(200).json(events);
  } catch (err) {
    console.error("❌ Error fetching events:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Register a participant and increment registrations
const registerParticipant = async (req, res) => {
  try {
    const { eventId, name, email, phone, college, role, motivation } = req.body;

    await EventModel.findByIdAndUpdate(
      eventId,
      { $inc: { registrations: 1 } },
      { new: true }
    );

    console.log("✅ Participant Registered:", {
      eventId, name, email, phone, college, role, motivation,
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

// ✅ Delete an event by ID
const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const deleted = await EventModel.findByIdAndDelete(eventId);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    console.log("🗑️ Event Deleted:", deleted.title);
    res.status(200).json({ success: true, message: "Event deleted successfully", deleted });
  } catch (err) {
    console.error("❌ Error deleting event:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Update an event by ID
const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const updatedEvent = await EventModel.findByIdAndUpdate(eventId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    console.log("✏️ Event Updated:", updatedEvent.title);
    res.status(200).json({ success: true, updatedEvent });
  } catch (err) {
    console.error("❌ Error updating event:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Toggle pin status for event
const togglePin = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    event.isPinned = !event.isPinned;
    await event.save();

    console.log(`📌 Event Pin Status Toggled: ${event.title} => ${event.isPinned}`);
    res.status(200).json({
      success: true,
      message: `Event pin status toggled to ${event.isPinned}`,
      event,
    });
  } catch (err) {
    console.error("❌ Error toggling pin:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  registerParticipant,
  deleteEvent,
  updateEvent,
  togglePin,
};
