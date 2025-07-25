const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  location: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  category: { type: String },
  time: { type: String },
  mode: { type: String },
  venue: { type: String },
  tags: { type: String },
  maxParticipants: { type: Number },
  fee: { type: Number },
  organizerName: { type: String },
  organizerEmail: { type: String },
  isPinned: { type: Boolean, default: false }
}, {
  timestamps: true // ✅ Adds createdAt and updatedAt fields automatically
});

const EventModel = mongoose.model("Event", eventSchema);

module.exports = { EventModel };
