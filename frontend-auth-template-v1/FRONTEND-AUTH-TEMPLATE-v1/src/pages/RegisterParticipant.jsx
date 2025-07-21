import { useState, useEffect } from "react";
import { axiosInstance } from "../axios/axiosInstance";

const RegisterParticipant = () => {
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        college: "",
        role: "",
        motivation: "",
    });

    // Fetch events from backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axiosInstance.get("/event");
                setEvents(res.data);
            } catch (err) {
                console.error("Failed to fetch events:", err);
            }
        };
        fetchEvents();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post("/event/participants", {
                ...formData,
                eventId: selectedEventId,
            });
            alert("Registration successful!");
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Failed to register.");
        }

        // Reset form
        setSelectedEventId(null);
        setFormData({
            name: "",
            email: "",
            phone: "",
            college: "",
            role: "",
            motivation: "",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-10 left-10 w-24 h-24 bg-indigo-300 rounded-full animate-float opacity-20"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-300 rounded-full animate-float opacity-20" style={{animationDelay: '1.5s'}}></div>
            
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-8 animate-fade-in-up">
                    <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                        <span className="text-3xl text-white">👥</span>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Join Events
                    </h1>
                    <p className="text-gray-600 text-lg">Discover and register for exciting events</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                    {events.map((event) => (
                        <div
                            key={event._id || event.id}
                            className="card p-6 hover-lift"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h2>
                                    <p className="text-gray-600 mb-3">{event.description}</p>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-medium">Date:</span> {new Date(event.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-lg">📅</span>
                                </div>
                            </div>
                            
                            <button
                                className="btn-primary w-full"
                                onClick={() => setSelectedEventId(event._id || event.id)}
                            >
                                Register Now
                            </button>

                        {selectedEventId === (event._id || event.id) && (
                            <form className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg" onSubmit={handleSubmit}>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Registration Form</h3>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="input-field"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="input-field"
                                    required
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="input-field"
                                    required
                                />
                                <input
                                    type="text"
                                    name="college"
                                    placeholder="College / Organization"
                                    value={formData.college}
                                    onChange={handleInputChange}
                                    className="input-field"
                                    required
                                />
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="input-field"
                                    required
                                >
                                    <option value="">Select Role/Year</option>
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year">3rd Year</option>
                                    <option value="Final Year">Final Year</option>
                                    <option value="Working Professional">Working Professional</option>
                                </select>
                                <textarea
                                    name="motivation"
                                    placeholder="Why do you want to join this event?"
                                    value={formData.motivation}
                                    onChange={handleInputChange}
                                    className="input-field"
                                    rows={3}
                                ></textarea>
                                <button
                                    type="submit"
                                    className="btn-primary w-full"
                                >
                                    Submit Registration
                                </button>
                            </form>
                        )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export  { RegisterParticipant };
