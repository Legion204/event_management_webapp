import React from 'react';
import { CiCalendar } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";

const Home = () => {
    return (
        <div className="bg-[#191510] p-8 shadow-lg text-center lg:h-dvh md:h-dvh sm:h-full">
            <h1 className="text-4xl font-bold text-[#F7F7F5] mb-4">Welcome to Event Manager!</h1>
            <p className="text-lg text-[#F7F7F5]">Your ultimate platform for discovering, managing, and joining exciting events.</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#D85529] p-6 rounded-lg shadow-md">
                    <CiCalendar className="w-12 h-12 text-[#F7F7F5] mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-[#F7F7F5] mb-2">Explore Events</h2>
                    <p className="text-[#F7F7F5]">Browse through a wide variety of events happening around you.</p>
                </div>
                <div className="bg-[#D85529] p-6 rounded-lg shadow-md">
                    <CiCirclePlus className="w-12 h-12 text-[#F7F7F5] mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-[#F7F7F5] mb-2">Create Your Own</h2>
                    <p className="text-[#F7F7F5]">Easily add and manage your events with our intuitive tools.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;