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
      <h2 className="text-center text-red-500 mt-10 text-2xl">
        ❌ Unauthorized Access
      </h2>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header with Home button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          🏠 Home
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="text-center text-gray-600">No events found.</p>
      ) : (
        events.map((event) => (
          <div
            key={event._id}
            className="border p-4 mb-4 rounded shadow bg-white"
          >
            {editingEventId === event._id ? (
              <form
                onSubmit={handleEditSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
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
                <div className="col-span-2 space-x-2">
                  <button type="submit" className="btn-primary">
                    💾 Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingEventId(null)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="text-xl font-bold">{event.title}</h2>
                <p>{event.description}</p>
                <p className="text-sm text-gray-600">
                  {new Date(event.date).toLocaleDateString()} at {event.time}
                </p>
                <p className="text-sm">
                  Mode: {event.mode} | Venue: {event.venue}
                </p>
                <p className="text-sm">
                  Fee: ₹{event.fee} | Max Participants:{" "}
                  {event.maxParticipants}
                </p>
                <p className="text-sm">
                  Organizer: {event.organizerName} ({event.organizerEmail})
                </p>
                <p className="text-sm text-blue-500">
                  📌 Pinned: {event.isPinned ? "Yes" : "No"}
                </p>

                <div className="space-x-2 mt-2">
                  <button
                    className="btn-secondary"
                    onClick={() => handleEditClick(event)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(event._id)}
                  >
                    🗑️ Delete
                  </button>
                  <button
                    className="btn-primary"
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
