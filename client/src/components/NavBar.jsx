import React, { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import logo from '../assets/logosm.png';

const NavBar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };
    return (
        <div className="navbar bg-black shadow-sm text-white">
            <div className="navbar-start lg:justify-between lg:mr-28 ">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-black rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "border-b-2 border-[#D85529] pb-1 text-white"
                                    : "hover:text-[#D85529]"
                            }
                        >
                            Home
                        </NavLink></li>
                        <li><NavLink
                            to="/events"
                            className={({ isActive }) =>
                                isActive
                                    ? "border-b-2 border-[#D85529] pb-1 text-white"
                                    : "hover:text-[#D85529]"
                            }
                        >
                            Events
                        </NavLink></li>
                        <li><NavLink
                            to="/add-event"
                            className={({ isActive }) =>
                                isActive
                                    ? "border-b-2 border-[#D85529] pb-1 text-white"
                                    : "hover:text-[#D85529]"
                            }
                        >
                            Add Event
                        </NavLink></li>
                        <li><NavLink
                            to="/my-events"
                            className={({ isActive }) =>
                                isActive
                                    ? "border-b-2 border-[#D85529] pb-1 text-white"
                                    : "hover:text-[#D85529]"
                            }
                        >
                            My Events
                        </NavLink></li>
                    </ul>
                </div>
                <Link to="/" className="text-xl font-bold">
                    <img className='w-52'
                        src={logo}
                        alt="logo" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-8 text-lg">
                    <li><NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "border-b-2 border-[#D85529] pb-1 text-white"
                                : "hover:text-[#D85529]"
                        }
                    >
                        Home
                    </NavLink></li>
                    <li><NavLink
                        to="/events"
                        className={({ isActive }) =>
                            isActive
                                ? "border-b-2 border-[#D85529] pb-1 text-white"
                                : "hover:text-[#D85529]"
                        }
                    >
                        Events
                    </NavLink></li>
                    <li><NavLink
                        to="/add-event"
                        className={({ isActive }) =>
                            isActive
                                ? "border-b-2 border-[#D85529] pb-1 text-white"
                                : "hover:text-[#D85529]"
                        }
                    >
                        Add Event
                    </NavLink></li>
                    <li><NavLink
                        to="/my-events"
                        className={({ isActive }) =>
                            isActive
                                ? "border-b-2 border-[#D85529] pb-1 text-white"
                                : "hover:text-[#D85529]"
                        }
                    >
                        My Events
                    </NavLink></li>

                </ul>
            </div>
            <div className="navbar-end lg:justify-between lg:ml-28 ">
                {!user ? (

                    <Link to={'/register'} className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-[#D85529] rounded-xl group">
                        <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#74120D] rounded group-hover:-mr-4 group-hover:-mt-4">
                            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                        </span>
                        <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-[#74120D] rounded group-hover:mb-12 group-hover:translate-x-0"></span>
                        <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">Sign In</span>
                    </Link>
                ) : (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="user profile image"
                                    src={user?.photoURL} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow">
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