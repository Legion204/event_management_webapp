import React from 'react';
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddEvents = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const payload = {
                ...form,
                name: user.name,
                email: user.email
            };
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/events`, payload, {
                headers: { Authorization: token },
            });
            setSuccess("Event created successfully!");
            setForm({ title: "", date: "", time: "", location: "", description: "" });
            navigate("/my-events");
        } catch (err) {
            setError(err.response?.data?.error || "Failed to add event");
        }
    };
    return (
        <div className="min-h-screen bg-[#191510] flex items-center justify-center px-4 text-white">
            <form
                onSubmit={handleSubmit}
                className="bg-[#312D27] p-8 rounded shadow w-full max-w-xl"
            >
                <h2 className="text-2xl font-bold mb-6 text-[#D85529] text-center">
                    Add New Event
                </h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                {success && <p className="text-green-600 mb-4">{success}</p>}
                <div className="grid grid-cols-1 gap-4">
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Event Title"
                        required
                        className="p-3 border rounded border-[#D85529] focus:ring-[#D85529]"
                    />
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                        className="p-3 border rounded border-[#D85529] focus:ring-[#D85529]"
                    />
                    <input
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        required
                        className="p-3 border rounded border-[#D85529] focus:ring-[#D85529]"
                    />
                    <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Location"
                        required
                        className="p-3 border rounded border-[#D85529] focus:ring-[#D85529]"
                    />
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Event Description"
                        required
                        className="p-3 border rounded h-24 border-[#D85529] focus:ring-[#D85529]"
                    />
                    <button
                        type="submit"
                        className="bg-[#D85529] text-white py-3 rounded hover:bg-[#D85529]"
                    >
                        Add Event
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEvents;