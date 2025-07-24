// src/pages/AdminPanelPage.jsx
import { useEffect, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { useAppContext } from "../contexts/appContext";
import { Navigate } from "react-router-dom";

const AdminPanelPage = () => {
  const { user } = useAppContext();
  const [events, setEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user.isAuthenticated && user.role === "admin") {
      fetchEvents();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      const res = await axiosInstance.get("/event");
      setEvents(res.data); // ✅ array of events
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const handleEditClick = (event) => {
    setEditingEventId(event._id);
    setFormData(event);
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
        await axiosInstance.delete(`/event/${event._id}`);
        alert("Event deleted successfully!");
        fetchEvents();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const handlePinToggle = async (event) => {
    try {
      await axiosInstance.put(`/event/${event._id}`, {
        ...event,
        isPinned: !event.isPinned,
      });
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
  if (user.role !== "admin") return <h2 className="text-center text-red-500">Unauthorized</h2>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event) => (
          <div key={event._id} className="border p-4 mb-4 rounded shadow">
            {editingEventId === event._id ? (
              <form onSubmit={handleEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="input-field" />
                <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="input-field" />
                <input name="date" type="date" value={formData.date?.split("T")[0]} onChange={handleChange} className="input-field" />
                <input name="time" value={formData.time} onChange={handleChange} placeholder="Time" className="input-field" />
                <input name="mode" value={formData.mode} onChange={handleChange} placeholder="Mode" className="input-field" />
                <input name="venue" value={formData.venue} onChange={handleChange} placeholder="Venue" className="input-field" />
                <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma-separated)" className="input-field" />
                <input name="maxParticipants" value={formData.maxParticipants} onChange={handleChange} placeholder="Max Participants" className="input-field" />
                <input name="fee" value={formData.fee} onChange={handleChange} placeholder="Fee" className="input-field" />
                <input name="organizerName" value={formData.organizerName} onChange={handleChange} placeholder="Organizer Name" className="input-field" />
                <input name="organizerEmail" value={formData.organizerEmail} onChange={handleChange} placeholder="Organizer Email" className="input-field" />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="input-field md:col-span-2" />

                <div className="col-span-2 space-x-2 mt-2">
                  <button type="submit" className="btn-primary">Save</button>
                  <button type="button" className="btn-secondary" onClick={() => setEditingEventId(null)}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="text-xl font-bold">{event.title}</h2>
                <p>{event.description}</p>
                <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()} at {event.time}</p>
                <p className="text-sm">Mode: {event.mode} | Venue: {event.venue}</p>
                <p className="text-sm">Fee: ₹{event.fee} | Participants: {event.maxParticipants}</p>
                <p className="text-sm">Organizer: {event.organizerName} ({event.organizerEmail})</p>
                <p className="text-sm text-blue-500">Pinned: {event.isPinned ? "Yes 📌" : "No"}</p>

                <div className="space-x-2 mt-2">
                  <button className="btn-secondary" onClick={() => handleEditClick(event)}>Edit</button>
                  <button className="btn-danger" onClick={() => handleDelete(event._id)}>Delete</button>
                  <button className="btn-primary" onClick={() => handlePinToggle(event)}>
                    {event.isPinned ? "Unpin" : "Pin"}
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
