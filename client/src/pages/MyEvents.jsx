import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline, IoPersonOutline, IoTimeOutline } from "react-icons/io5";
import { GoPersonAdd } from "react-icons/go";
import Swal from 'sweetalert2'

const MyEvents = () => {
    const { user, token } = useAuth();
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);
    const [confirmId, setConfirmId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMyEvents = async () => {
            try {
                setLoading(true); // start loading
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URI}/api/events/my?email=${user.email}`,
                    {
                        headers: { Authorization: token },
                    }
                );
                setEvents(res.data);
            } catch (err) {
                console.error("Error fetching your events", err);
            } finally {
                setLoading(false); // stop loading
            }
        };

        if (user?.email && token) fetchMyEvents();
    }, [user.email, token]);

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            background: "#312D27",
            color: "#fff",
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_SERVER_URI}/api/events/${id}`);
                setEvents((prev) => prev.filter((event) => event._id !== id));

                Swal.fire({
                    title: "Deleted!",
                    text: "Your event has been deleted.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                    background: "#312D27",
                    color: "#fff",
                });
            } catch (err) {
                console.error("Error deleting event", err);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete the event.",
                    icon: "error",
                    background: "#312D27",
                    color: "#fff",
                });
            }
        }
    };

    const handleEdit = (event) => {
        setEditingEvent({ ...event });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const { _id, ...updateData } = editingEvent;
        await axios.put(`${import.meta.env.VITE_SERVER_URI}/api/events/${_id}`, updateData);
        setEditingEvent(null);
        setEvents((prev) =>
            prev.map((e) => (e._id === _id ? { ...e, ...updateData } : e))
        );
    };
    return (
        <div className="p-6 bg-[#191510] min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-center text-[#D85529]">
                My Events
            </h2>

            {!loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div key={event._id} className="bg-[#312D27] p-5 rounded shadow text-white">
                            <h3 className="text-xl font-bold mb-2 text-[#D85529]">{event.title}</h3>
                            <p className="text-sm flex items-center"> <CiCalendar />{event.date} <IoTimeOutline />{event.time}</p>
                            <p className="text-sm flex items-center"><IoLocationOutline />  {event.location}</p>
                            <p className="text-sm flex items-center"> <GoPersonAdd /> {event.attendeeCount} attendees</p>
                            <p className="text-sm mb-2"> {event.description}</p>
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => handleEdit(event)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(event._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center min-h-[60vh]">
                    <div className="flex flex-col items-center">
                        <span className="inline-block w-10 h-10 border-4 border-[#D85529] border-t-transparent rounded-full animate-spin"></span>
                        <p className="mt-3 text-gray-600">Loading My Events...</p>
                    </div>
                </div>
            )}

            {/* Update Modal */}
            {editingEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <form
                        onSubmit={handleUpdateSubmit}
                        className="bg-white p-6 rounded text-white shadow w-full max-w-md"
                    >
                        <h3 className="text-xl font-bold mb-4">Edit Event</h3>
                        <input
                            type="text"
                            name="title"
                            value={editingEvent.title}
                            onChange={(e) =>
                                setEditingEvent({ ...editingEvent, title: e.target.value })
                            }
                            className="w-full mb-3 p-2 border rounded"
                        />
                        <input
                            type="date"
                            name="date"
                            value={editingEvent.date}
                            onChange={(e) =>
                                setEditingEvent({ ...editingEvent, date: e.target.value })
                            }
                            className="w-full mb-3 p-2 border rounded"
                        />
                        <input
                            type="time"
                            name="time"
                            value={editingEvent.time}
                            onChange={(e) =>
                                setEditingEvent({ ...editingEvent, time: e.target.value })
                            }
                            className="w-full mb-3 p-2 border rounded"
                        />
                        <input
                            type="text"
                            name="location"
                            value={editingEvent.location}
                            onChange={(e) =>
                                setEditingEvent({ ...editingEvent, location: e.target.value })
                            }
                            className="w-full mb-3 p-2 border rounded"
                        />
                        <textarea
                            name="description"
                            value={editingEvent.description}
                            onChange={(e) =>
                                setEditingEvent({ ...editingEvent, description: e.target.value })
                            }
                            className="w-full mb-4 p-2 border rounded"
                        />
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditingEvent(null)}
                                type="button"
                                className="text-red-600 hover:underline"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default MyEvents;