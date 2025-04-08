import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import profile_icon from "../assets/Images/profile.png";
import bell from "../assets/Images/bell.png";
import settings from "../assets/Images/settings.png";
import search from "../assets/Images/search.png";

function Navbar() {
  const [userInfo, setUserInfo] = useState({
    name: "Name",
    username: "@username",
    profilePic: profile_icon,
  });

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("userInfo"));
      if (storedUser) {
        setUserInfo(storedUser);
      }
    } catch (err) {
      console.error("Failed to parse userInfo from localStorage:", err);
    }
  }, []);

  // Listen to localStorage changes across tabs
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "userInfo") {
        try {
          const updatedUser = JSON.parse(event.newValue);
          if (updatedUser) {
            setUserInfo(updatedUser);
          }
        } catch (err) {
          console.error("Error updating userInfo from storage event:", err);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <nav className="h-[10%] w-[calc(100%-20px)] bg-white p-[4px] mt-[10px] mx-[10px] flex justify-between items-center shadow-md rounded-[10px]">
      {/* Logo */}
      <Link to="/home" className="ml-[20px]">
        <h1 className="text-3xl font-bold text-[#FF3131]">Connectify</h1>
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-[15px] px-[15px]">
        {/* Search Bar */}
        <div className="flex items-center bg-[#DFE1E5] border-2 border-gray-300 hover:border-red-400 focus-within:border-red-500 transition-all duration-200 ease-in-out rounded-[20px] p-1 pl-3">
          <input
            type="text"
            placeholder="Search Something...."
            className="font-bold placeholder:font-bold placeholder-gray-500 w-[260px] h-[100%] border-none outline-none bg-transparent"
          />
          <button className="bg-transparent p-1 rounded hover:bg-[#E4E6EB] transition">
            <img src={search} alt="Search" className="w-6 h-6" />
          </button>
        </div>

        {/* Settings Icon */}
        <button className="bg-[#DFE1E5] p-2 rounded-full hover:shadow-md hover:bg-[#ADAEAF] transition">
          <img src={settings} alt="Settings" className="w-5 h-5" />
        </button>

        {/* Notification Icon */}
        <button className="bg-[#DFE1E5] p-2 rounded-full hover:shadow-md hover:bg-[#ADAEAF] transition">
          <img src={bell} alt="Notifications" className="w-5 h-5" />
        </button>

        {/* User Info */}
        <div className="text-right">
          <p className="font-semibold">{userInfo.name || "Name"}</p>
          <p className="text-sm text-[#737373]">{userInfo.username || "@Username"}</p>
        </div>

        {/* Profile Picture */}
        <button>
          <img
            src={userInfo.profilePic || profile_icon}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
