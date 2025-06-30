import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const handleLogout = () => {
        logout();
        navigate("/");
    };
    return (
        <div className="navbar bg-black shadow-sm text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/event">Events</Link></li>
                        <li><Link to="/add-event">Add Event</Link></li>
                        <li><Link to="/my-event">My Event</Link></li>
                    </ul>
                </div>
                <Link to="/" className="text-xl font-bold">
                    <img className='w-52'
                        src="/src/assets/logosm.png"
                        alt="logo" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-8 text-lg">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/events">Events</Link></li>
                    <li><Link to="/add-event">Add Event</Link></li>
                    <li><Link to="/my-events">My Event</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                {!user ? (
                    <Link
                        to="/register"
                        className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                    >
                        Sign In
                    </Link>
                ) : (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="user profile image"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="text-black">{user?.name}</a>
                            </li>
                            <li><button onClick={handleLogout} className='text-black btn-accent' >Logout</button></li>
                        </ul>
                    </div>

                )}
            </div>
        </div >
    );
};

export default NavBar;