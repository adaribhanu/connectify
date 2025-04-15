import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaRegCommentDots } from 'react-icons/fa';
import Post from '../components/post';
import Navbar from '../components/nav';
import profile_icon from "../assets/Images/profile.png";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [reminderInput, setReminderInput] = useState({ title: '', date: '' });

  // Load user info
  useEffect(() => {
    if (location.state?.userInfo) {
      setUserInfo(location.state.userInfo);
    } else {
      const storedUser = localStorage.getItem("userInfo");
      if (storedUser) {
        setUserInfo(JSON.parse(storedUser));
      }
    }
  }, [location.state]);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("userInfo"));
        if (storedUser?.username) {
          const response = await fetch(`http://localhost:5000/api/posts/${storedUser.username}`);
          const contentType = response.headers.get("content-type");

          if (!response.ok) throw new Error(`Server error: ${response.status}`);
          if (!contentType.includes("application/json")) {
            const text = await response.text();
            throw new Error(`Expected JSON, got HTML:\n${text}`);
          }

          const data = await response.json();
          setPosts(data);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  // 🔥 Fetch reminders from backend using userId (not username)
  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("userInfo"));
        if (storedUser?._id) {
          const res = await axios.get(`http://localhost:5000/api/reminders/${storedUser._id}`);
          setReminders(res.data);
        }
      } catch (err) {
        console.error("Error fetching reminders:", err);
      }
    };

    fetchReminders();
  }, []);

  // 🔥 Save reminder to backend
  const handleReminderSubmit = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (!reminderInput.title || !reminderInput.date || !storedUser?._id) return;

    try {
      const response = await axios.post(`http://localhost:5000/api/reminders/${storedUser._id}`, {
        title: reminderInput.title,
        date: reminderInput.date,
      });

      setReminders([...reminders, response.data]);
      setReminderInput({ title: '', date: '' });
    } catch (err) {
      console.error("Error saving reminder:", err);
    }
  };

  const handleLike = (id) => {
    setPosts(posts.map(post =>
      post._id === id ? { ...post, likes: (post.likes || 0) + 1 } : post
    ));
  };

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleDelete = async (postId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6] flex flex-col">
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-6 px-4 py-4 flex-1 overflow-y-auto">
        {/* Left Sidebar */}
        <div className="lg:w-[20%] w-full h-full">
          <div className="bg-white p-4 flex flex-col rounded-2xl shadow-lg items-center h-full">
            <img src={userInfo.profilePic || profile_icon} alt="profile" className="w-[100px] h-[100px] rounded-full object-cover shadow" />
            <h2 className="text-2xl mt-[10px] font-bold text-[#ff3131]">{userInfo.name || "Name"}</h2>
            <h2 className="text-[14px] font-bold text-[#737373]">{userInfo.username || "@Username"}</h2>
            <div className="flex justify-between w-full bg-[#DFE1E5] rounded-[15px] gap-2 p-3 mt-[20px] text-center text-sm">
              <div className="flex-1"><strong>20k</strong><br />Followers</div>
              <div className="flex-1"><strong>10k</strong><br />Following</div>
              <div className="flex-1"><strong>{posts.length}</strong><br />Posts</div>
            </div>
            <p className="text-gray-600 text-center mt-[20px]">{userInfo.bio || ""}</p>
            <p className="text-sm text-gray-500 mt-1">📍 {userInfo.location || ""}</p>
            <p className="text-sm text-gray-500">💼 {userInfo.profession || ""}</p>
            <p className="text-sm text-gray-500">📞 {userInfo.phone || ""}</p>
          </div>
        </div>

        {/* Middle Section */}
        <div className="lg:w-[50%] w-full flex flex-col">
          <Post onPostSubmit={handleNewPost} />
          <h3 className="text-2xl font-bold text-[#ff3131] mb-4 mt-4 px-2">Your Posts</h3>
          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-220px)] px-2 pr-3 scrollbar-hide">
            {posts.map((post, index) => (
              <div
                key={post._id || index}
                className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 relative transition-transform duration-300 hover:scale-[1.01]"
              >
                {post.image && (
                  <img
                    src={post.image.startsWith("http") ? post.image : `http://localhost:5000/${post.image}`}
                    alt="Post"
                    className="w-full rounded-xl mb-4 object-cover max-h-[400px] shadow-sm"
                    onError={(e) => e.target.src = "https://via.placeholder.com/400"}
                  />
                )}
                <div className="mb-2">
                  <p className="text-[#ff3131] font-bold text-base">{post.name || userInfo.name || "Unknown"}</p>
                  <p className="text-[#ff3131] font-medium text-sm">@{post.username || userInfo.username || "unknown"}</p>
                </div>
                <p className="text-gray-800 mb-4">{post.caption}</p>
                <div className="flex justify-between items-center text-gray-600 text-sm">
                  <span className="italic">{post.date || "Just now"}</span>
                  <div className="flex gap-3 items-center">
                    <button onClick={() => handleLike(post._id)} className="flex items-center gap-1 hover:text-[#ff3131] transition">
                      <FaRegHeart className="text-lg" /> {post.likes || 0}
                    </button>
                    <button className="flex items-center gap-1 hover:text-[#ff3131] transition">
                      <FaRegCommentDots className="text-lg" /> Comment
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-white text-sm bg-[#ff3131] px-3 py-1.5 rounded-md shadow hover:bg-[#bb1e1e] transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Reminders */}
        <div className="lg:w-[30%] w-full h-full">
          <div className="bg-white p-4 rounded-xl shadow h-full flex flex-col">
            <h3 className="text-xl font-semibold text-[#ff3131] mb-4">Set a Reminder</h3>
            <form onSubmit={handleReminderSubmit} className="flex flex-col gap-3 mb-4">
              <input
                type="text"
                name="title"
                value={reminderInput.title}
                onChange={(e) => setReminderInput({ ...reminderInput, title: e.target.value })}
                placeholder="Reminder Title"
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-[#ff3131]"
              />
              <input
                type="date"
                name="date"
                value={reminderInput.date}
                onChange={(e) => setReminderInput({ ...reminderInput, date: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-[#ff3131]"
              />
              <button
                type="submit"
                className="bg-[#ff3131] text-white px-6 py-2 rounded-[10px] hover:bg-[#bb1e1e] font-semibold"
              >
                Add Reminder
              </button>
            </form>
            <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-280px)]">
              {reminders.map((reminder) => (
                <div key={reminder._id} className="p-3 bg-[#ff3131] rounded-xl text-white">
                  <p className="font-semibold">{reminder.title}</p>
                  <p className="italic">{reminder.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
