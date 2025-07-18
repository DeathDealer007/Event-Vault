import React, { useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";

const CreateEvent = () => {
    const [eventMode, setEventMode] = useState("offline");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Workshop",
        date: "",
        time: "09:00 AM",
        mode: "offline",
        venue: "",
        tags: "",
        maxParticipants: "",
        fee: "",
        organizerName: "",
        organizerEmail: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const eventData = {
                ...formData,
                date: new Date(`${formData.date} ${formData.time}`),
                location: formData.venue
            };
            
            const response = await axiosInstance.post("/event", eventData);
            if (response.data.success) {
                SuccessToast("Event created successfully!");
                setFormData({
                    title: "",
                    description: "",
                    category: "Workshop",
                    date: "",
                    time: "09:00 AM",
                    mode: "offline",
                    venue: "",
                    tags: "",
                    maxParticipants: "",
                    fee: "",
                    organizerName: "",
                    organizerEmail: ""
                });
            }
        } catch (error) {
            ErrorToast("Failed to create event", error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-blue-300 rounded-full animate-float opacity-20"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-indigo-300 rounded-full animate-float opacity-20" style={{animationDelay: '2s'}}></div>
            
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-8 animate-fade-in-up">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                        <span className="text-3xl text-white">📅</span>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                        Create Event
                    </h1>
                    <p className="text-gray-600 text-lg">Organize an amazing event for your community</p>
                </div>
                
                <form className="card p-8 space-y-8 animate-fade-in-up" style={{animationDelay: '0.2s'}} onSubmit={handleSubmit}>
                {/* Title */}
                <div>
                    <label className="block font-medium mb-1">Title</label>
                    <input 
                        type="text" 
                        name="title"
                        className="w-full border rounded p-2" 
                        placeholder="Event title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea 
                        name="description"
                        className="w-full border rounded p-2" 
                        placeholder="Describe your event..."
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>

                {/* Category Dropdown */}
                <div>
                    <label className="block font-medium mb-1">Category</label>
                    <select 
                        name="category"
                        className="w-full border rounded p-2"
                        value={formData.category}
                        onChange={handleInputChange}
                    >
                        <option>Workshop</option>
                        <option>Conference</option>
                        <option>Hackathon</option>
                        <option>Webinar</option>
                        <option>Meetup</option>
                    </select>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">Date</label>
                        <input 
                            type="date" 
                            name="date"
                            className="w-full border rounded p-2"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Time</label>
                        <select 
                            name="time"
                            className="w-full border rounded p-2"
                            value={formData.time}
                            onChange={handleInputChange}
                        >
                            <option>09:00 AM</option>
                            <option>10:00 AM</option>
                            <option>11:00 AM</option>
                            <option>02:00 PM</option>
                            <option>05:00 PM</option>
                        </select>
                    </div>
                </div>

                {/* Mode Selector: Online/Offline */}
                <div>
                    <label className="block font-medium mb-1">Mode</label>
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="mode"
                                value="offline"
                                checked={eventMode === "offline"}
                                onChange={() => setEventMode("offline")}
                            />
                            Offline
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="mode"
                                value="online"
                                checked={eventMode === "online"}
                                onChange={() => setEventMode("online")}
                            />
                            Online
                        </label>
                    </div>
                </div>

                {/* Venue or Link */}
                <div>
                    <label className="block font-medium mb-1">
                        {eventMode === "online" ? "Meeting Link" : "Venue Address"}
                    </label>
                    <input
                        type="text"
                        name="venue"
                        className="w-full border rounded p-2"
                        placeholder={eventMode === "online" ? "Zoom/Google Meet link" : "Venue address"}
                        value={formData.venue}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block font-medium mb-1">Event Banner</label>
                    <input type="file" className="w-full border rounded p-2" accept="image/*" />
                </div>

                {/* Tags */}
                <div>
                    <label className="block font-medium mb-1">Tags</label>
                    <input
                        type="text"
                        name="tags"
                        className="w-full border rounded p-2"
                        placeholder="e.g. tech, coding, AI"
                        value={formData.tags}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Max Participants and Fee */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">Max Participants</label>
                        <input 
                            type="number" 
                            name="maxParticipants"
                            className="w-full border rounded p-2" 
                            placeholder="100"
                            value={formData.maxParticipants}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Fee (₹)</label>
                        <input 
                            type="number" 
                            name="fee"
                            className="w-full border rounded p-2" 
                            placeholder="0 for free"
                            value={formData.fee}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {/* Organizer Info */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">Organizer Name</label>
                        <input 
                            type="text" 
                            name="organizerName"
                            className="w-full border rounded p-2" 
                            placeholder="John Doe"
                            value={formData.organizerName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <input 
                            type="email" 
                            name="organizerEmail"
                            className="w-full border rounded p-2" 
                            placeholder="organizer@example.com"
                            value={formData.organizerEmail}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between pt-4">
                    <button
                        type="button"
                        className="btn-secondary"
                    >
                        Save as Draft
                    </button>
                    <button
                        type="submit"
                        className="btn-primary"
                    >
                        Create Event
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
};

export { CreateEvent } ;


