import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        photoURL: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/auth/register`, form);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed");
        }
    };
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-[#191510] text-white px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-[#312D27] p-8 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-[#D85529]">Register</h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                    className="w-full mb-4 p-3 border rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    className="w-full mb-4 p-3 border rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    className="w-full mb-4 p-3 border rounded"
                />
                <input
                    type="text"
                    name="photoURL"
                    placeholder="Photo URL"
                    onChange={handleChange}
                    className="w-full mb-6 p-3 border rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-[#D85529] text-white py-3 rounded hover:bg-[#71120C]"
                >
                    Register
                </button>
                <p className='mt-3'>Have an account? <Link className='link link-primary' to={'/login'}>Login</Link></p>
            </form>
        </div>
    );
};

export default Register;