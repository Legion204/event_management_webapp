import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline, IoPersonOutline, IoTimeOutline } from "react-icons/io5";
import { GoPersonAdd } from "react-icons/go";

const Events = () => {
    const { user, token } = useAuth();
    const [events, setEvents] = useState([]);
    const [joinedEvents, setJoinedEvents] = useState([]);

    // 🆕 Search and Filter state
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    // 🧠 Fetch events from backend when token/search/filter changes
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/events`, {
                    headers: { Authorization: token },
                    params: { search, filter },
                });

                // Sort newest first
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
    }, [search, filter, token]);

    // 🖱 Join event handler
    const handleJoin = async (id) => {
        if (joinedEvents.includes(id)) return;

        try {
            await axios.patch(`${import.meta.env.VITE_SERVER_URI}/api/events/${id}/join`, {}, {
                headers: {
                    Authorization: token,
                    email: user.email,
                },
            });

            // Optimistic update
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
        <div className="p-6 bg-[#191510] min-h-screen text-white">
            <h2 className="text-3xl font-bold mb-6 text-center text-[#D85529]">All Events</h2>
            <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                {/* 🔍 Search input */}
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search events by title"
                    className="w-full md:w-1/2 p-3 border border-[#D85529] rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D85529]"
                />

                {/* Filter dropdown */}
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full md:w-1/3 p-3 border border-[#D85529] rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D85529] bg-[#191510]"
                >
                    <option value="all"> All Dates</option>
                    <option value="today"> Today</option>
                    <option value="this-week"> This Week</option>
                    <option value="last-week"> Last Week</option>
                    <option value="this-month"> This Month</option>
                    <option value="last-month"> Last Month</option>
                </select>

                {/* Clear Filters Button */}
                <button
                    onClick={() => {
                        setSearch("");
                        setFilter("all");
                    }}
                    className="bg-[#D85529] px-4 py-2 rounded hover:bg-[#74120D] text-sm"
                >
                    Clear Filters
                </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event._id} className="bg-[#312D27] p-5 rounded shadow">
                        <h3 className="text-xl font-bold mb-2 text-[#D85529]">{event.title}</h3>
                        <p className="text-sm mb-1 flex items-center"><CiCalendar /> {event.date} <IoTimeOutline />{event.time}</p>
                        <p className="text-sm mb-1 flex items-center"><IoLocationOutline /> {event.location}</p>
                        <p className="text-sm mb-2 flex items-center"><IoPersonOutline />Posted by: {event.name}</p>
                        <p className="mb-2">{event.description}</p>
                        <p className="mb-3 font-semibold flex items-center"><GoPersonAdd/> Attendees: {event.attendeeCount}</p>
                        <button
                            onClick={() => handleJoin(event._id)}
                            disabled={joinedEvents.includes(event._id)}
                            className={`w-full py-2 rounded text-white ${joinedEvents.includes(event._id)
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-[#D85529] hover:bg-[#74120D]"
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