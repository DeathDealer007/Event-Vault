import { useEffect, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { useAppContext } from "../contexts/appContext";
import { Navigate, Link } from "react-router-dom";

const ADMIN_EMAIL = "ankit19kumar2004@gmail.com";

const AdminPanelPage = () => {
  const { user } = useAppContext();
  const [events, setEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user.isAuthenticated && user.email === ADMIN_EMAIL) {
      fetchEvents();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      const res = await axiosInstance.get("/event");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const handleEditClick = (event) => {
    setEditingEventId(event._id);
    setFormData({ ...event });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/event/${editingEventId}`, formData);
      setEditingEventId(null);
      fetchEvents();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axiosInstance.delete(`/event/${id}`);
        alert("Event deleted successfully!");
        fetchEvents();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const handlePinToggle = async (eventId) => {
    try {
      await axiosInstance.patch(`/event/${eventId}/pin`);
      fetchEvents();
    } catch (err) {
      console.error("Pin toggle failed:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!user.isAuthenticated) return <Navigate to="/login" />;
  if (user.email !== ADMIN_EMAIL) {
    return (
      <h2 className="text-center text-red-500 mt-10 text-2xl font-semibold animate-fade-in-up">
        ❌ Unauthorized Access
      </h2>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-white animate-fade-in-up">🛠️ Admin Panel</h1>
        <Link
          to="/"
          className="btn btn-primary hover-lift"
        >
          🏠 Home
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="text-center text-white/80 animate-fade-in-up">No events found.</p>
      ) : (
        events.map((event) => (
          <div
            key={event._id}
            className="card mb-6 hover-lift animate-fade-in-up"
          >
            {editingEventId === event._id ? (
              <form
                onSubmit={handleEditSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {[
                  "title",
                  "category",
                  "date",
                  "time",
                  "mode",
                  "venue",
                  "tags",
                  "maxParticipants",
                  "fee",
                  "organizerName",
                  "organizerEmail",
                ].map((field) => (
                  <input
                    key={field}
                    name={field}
                    type={field === "date" ? "date" : "text"}
                    value={formData[field] || ""}
                    onChange={handleChange}
                    placeholder={
                      field.charAt(0).toUpperCase() + field.slice(1)
                    }
                    className="input-field"
                  />
                ))}

                <textarea
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  placeholder="Description"
                  className="input-field md:col-span-2"
                />

                <div className="col-span-2 space-x-3">
                  <button type="submit" className="btn btn-primary">
                    💾 Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingEventId(null)}
                    className="btn btn-secondary"
                  >
                    ❌ Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-blue-900">{event.title}</h2>
                <p className="text-gray-700">{event.description}</p>
                <div className="text-sm text-gray-600 mt-1">
                  📅 {new Date(event.date).toLocaleDateString()} | 🕒 {event.time}
                </div>
                <div className="text-sm text-gray-600">
                  Mode: {event.mode} | Venue: {event.venue}
                </div>
                <div className="text-sm text-gray-600">
                  🎟️ Fee: ₹{event.fee} | 👥 Max Participants: {event.maxParticipants}
                </div>
                <div className="text-sm text-gray-600">
                  👤 Organizer: {event.organizerName} ({event.organizerEmail})
                </div>
                <p className="text-sm mt-1">
                  📌 <span className={event.isPinned ? "text-green-600" : "text-red-500"}>
                    {event.isPinned ? "Pinned" : "Not Pinned"}
                  </span>
                </p>

                <div className="space-x-3 mt-3">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleEditClick(event)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(event._id)}
                  >
                    🗑️ Delete
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handlePinToggle(event._id)}
                  >
                    {event.isPinned ? "Unpin" : "📌 Pin"}
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPanelPage;
