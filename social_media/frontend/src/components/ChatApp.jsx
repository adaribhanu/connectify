import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profile_icon from "../assets/Images/profile.png";

const ChatApp = () => {
  // Default profile picture fallback (only if the user doesn't have a profile pic)
  const defaultProfilePic = '/avatars/default.png'; // Replace with your default image path
  
  const [userInfo, setUserInfo] = useState({
    name: "Name",
    username: "@username",
    profilePic: profile_icon , // Initially use default image as fallback
  });

  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // Fetch the logged-in user's info (example endpoint: '/api/user/info')
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get('/api/user/info'); // Fetch logged-in user info
        if (res.data) {
          setUserInfo({
            name: res.data.name,
            username: res.data.username,
            profilePic: res.data.profilePic || profile_icon, // Use user's profile pic or fallback
          });
        }
      } catch (err) {
        console.error('Error fetching user info:', err);
      }
    };

    // Fetch the profiles for suggestions
    const fetchProfiles = async () => {
      try {
        const res = await axios.get('/api/profile/suggestions');
        setProfiles(res.data);
      } catch (err) {
        console.error('Error fetching profiles:', err);
      }
    };

    fetchUserInfo();
    fetchProfiles();
  }, []);

  return (
    <div className="w-[320px] h-full bg-white rounded-2xl p-4 shadow-lg">
      {/* Stories */}
      <div className="flex items-center px-4 py-3 overflow-x-auto gap-4 scrollbar-hide">
        {/* New Story */}
        <div className="flex flex-col items-center">
          <div className="relative w-14 h-14">
            <img
              src={userInfo.profilePic || defaultProfilePic} // Show the logged-in user's profile pic or fallback
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
              +
            </div>
          </div>
          <span className="text-xs font-bold mt-1">New</span>
        </div>

        {/* User Stories */}
        {profiles.slice(0, 6).map((profile, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-14 h-14">
              <img
                src={profile.profilePic || '/avatars/default.png'} // Fallback to default if no profilePic
                alt={profile.name}
                className="w-14 h-14 rounded-full object-cover"
              />
            </div>
            <span className="text-xs font-bold mt-1 truncate">{profile.name}</span>
          </div>
        ))}
      </div>

      <div className="p-4 bg-[#DFE1E5] rounded-[15px] scrollbar-hide">
        <h2 className="text-lg font-semibold mb-2">Chat’s</h2>

        <div className="flex flex-col gap-2">
          {profiles.map((profile, index) => (
            <button
              key={index}
              className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white transition-all duration-200"
            >
              <img
                src={profile.profilePic || '/avatars/default.png'} // Fallback to default if no profilePic
                alt={profile.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="text-sm font-bold text-black">{profile.name}</p>
                <p className="text-xs font-bold text-gray-600">@{profile.username}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
