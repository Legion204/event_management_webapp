import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Events = () => {
    const { token,user } = useAuth();
    const [events, setEvents] = useState([]);
    const [joinedEvents, setJoinedEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/events", {
                    headers: {
                        Authorization: token,
                    },
                });

                // Sort by date + time
                const sorted = [...res.data].sort((a, b) => {
                    const d1 = new Date(`${a.date}T${a.time}`);
                    const d2 = new Date(`${b.date}T${b.time}`);
                    return d2 - d1;
                });

                setEvents(sorted);
            } catch (err) {
                console.error("Failed to fetch events:", err);
            }
        };

        if (token) fetchEvents();
    }, [token]);

    const handleJoin = async (id) => {
        if (joinedEvents.includes(id)) return;

        try {
            await axios.patch(`http://localhost:5000/api/events/${id}/join`, {}, {
                headers: {
                    Authorization: token,
                    email: user.email, // 👈 we're passing user email
                },
            });

            // Optimistically update UI
            setJoinedEvents([...joinedEvents, id]);
            setEvents((prev) =>
                prev.map((event) =>
                    event._id === id
                        ? { ...event, attendeeCount: event.attendeeCount + 1 }
                        : event
                )
            );
        } catch (err) {
            alert(err.response?.data?.error || "Failed to join");
        }
    };
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">All Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event._id} className="bg-white p-5 rounded shadow">
                        <h3 className="text-xl font-bold mb-2 text-purple-600">{event.title}</h3>
                        <p className="text-sm mb-1">📅 {event.date} @ {event.time}</p>
                        <p className="text-sm mb-1">📍 {event.location}</p>
                        <p className="text-sm mb-2">👤 Posted by: {event.name}</p>
                        <p className="mb-2">{event.description}</p>
                        <p className="mb-3 font-semibold">🙋 Attendees: {event.attendeeCount}</p>
                        <button
                            onClick={() => handleJoin(event._id)}
                            disabled={joinedEvents.includes(event._id)}
                            className={`w-full py-2 rounded text-white ${joinedEvents.includes(event._id)
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-purple-600 hover:bg-purple-700"
                                }`}
                        >
                            {joinedEvents.includes(event._id) ? "Joined" : "Join Event"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;