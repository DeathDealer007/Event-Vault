const Event = require("../../models/Event");

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting event" });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  registerParticipant,
  deleteEvent, // ✅ export this
};
