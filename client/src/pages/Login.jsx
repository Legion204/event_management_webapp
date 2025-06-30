import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/events");
            location.reload(true);
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        }
    };
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Login</h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
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
                    className="w-full mb-6 p-3 border rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700"
                >
                    Login
                </button>
                <p className='mt-3'>Don't Have an account? <Link className='link link-primary' to={'/register'}>Register</Link></p>
            </form>
        </div>
    );
};

export default Login;