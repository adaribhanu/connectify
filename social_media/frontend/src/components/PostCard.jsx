import React, { useState } from 'react';
import {
  FaRegHeart,
  FaRegCommentDots,
  FaShareAlt,
  FaRegBookmark,
} from 'react-icons/fa';
import profile_icon from "../assets/Images/profile.png";
import image from '../assets/Images/image1.png';

const PostCard = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleReadMore = () => {
    setExpanded(!expanded);
  };
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  return (
    <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 min-h-[250px]">
      {/* Image with shadow */}
      <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-xl">
        <img
          src={image}
          alt="UI"
          className="w-full h-full object-cover rounded-2xl"
        />
        {/* Overlay Buttons with shadow */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-6 px-4 py-2 rounded-[20px] bg-white/80 backdrop-blur-md text-gray-800 shadow-lg">
          <button className="flex items-center gap-1 hover:text-[#ff3131]">
            <FaRegHeart /> <span>5</span>
          </button>
          <button className="flex items-center gap-1 hover:text-[#ff3131]">
            <FaRegCommentDots /> <span>15</span>
          </button>
          <button className="flex items-center gap-1 hover:text-[#ff3131]">
            <FaShareAlt /> <span>3</span>
          </button>
          <button className="hover:text-[#ff3131]">
            <FaRegBookmark />
          </button>
        </div>
      </div>

      {/* Post Info */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 mb-1">
          <img src={userInfo.profilePic || profile_icon} alt="Profile"className="w-8 h-8 rounded-full"/>
          <div>
          <p className="font-semibold">{userInfo.name || "Name"}</p>
            <p className="text-xs text-gray-500">28th, Mar 2024</p>
          </div>
        </div>
        <p className="text-sm">
          🚀 <strong>Done with my first UI/UX project!</strong> 🎉<br />
          <span className="text-gray-600">
            {expanded
              ? 'Super excited to complete my first UI/UX case study! This was a great learning experience. I explored user personas, wireframes, color theory, and worked on real-time feedback. Looking forward to designing more and getting better at it!'
              : 'Super excited to complete my first UI/UX case study...'}
            <button
              className="text-[#ff3131] hover:underline ml-1"
              onClick={handleToggleReadMore}
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          </span>
        </p>
      </div>
    </div>
  );
};

export default PostCard;
