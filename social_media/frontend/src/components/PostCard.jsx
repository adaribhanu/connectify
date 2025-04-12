import React, { useState, useEffect } from 'react';
import {
  FaRegHeart,
  FaRegCommentDots,
  FaShareAlt,
  FaRegBookmark,
} from 'react-icons/fa';
import profile_icon from "../assets/Images/profile.png";

const PostCard = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await fetch('/api/posts'); // adjust endpoint if needed
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchAllPosts();
  }, []);

  const toggleReadMore = (id) => {
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => {
        const isExpanded = expandedPostId === post._id;
        // eslint-disable-next-line no-unused-vars
        const userInfo = post.user || {}; // if your post includes full user info, or fallback to default

        return (
          <div
            key={post._id}
            className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 min-h-[250px]"
          >
            {/* Image */}
            <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={
                  post.image?.startsWith("http")
                    ? post.image
                    : `http://localhost:5000/${post.image}`
                }
                alt="Post"
                className="w-full h-full object-contain rounded-2xl"
              />
              {/* Overlay Buttons */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-6 px-4 py-2 rounded-[20px] bg-white/80 backdrop-blur-md text-gray-800 shadow-lg">
                <button className="flex items-center gap-1 hover:text-[#ff3131]">
                  <FaRegHeart /> <span>{post.likes || 0}</span>
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
                <img
                  src={post.profilePic || profile_icon}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-semibold">{post.username || "Unknown"}</p>
                  <p className="text-xs text-gray-500">
                    {post.date || "Date not available"}
                  </p>
                </div>
              </div>
              <p className="text-sm">
                🚀 <strong>{post.title || "New Post!"}</strong> 🎉<br />
                <span className="text-gray-600">
                  {isExpanded
                    ? post.caption
                    : `${post.caption?.slice(0, 100)}...`}
                  {post.caption?.length > 100 && (
                    <button
                      className="text-[#ff3131] hover:underline ml-1"
                      onClick={() => toggleReadMore(post._id)}
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostCard;
