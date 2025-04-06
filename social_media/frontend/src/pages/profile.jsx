import React, { useState } from 'react';
import profilePic from '../assets/images/profile.png';
import { FaRegHeart, FaRegCommentDots } from 'react-icons/fa';
import Post from '../components/post';
import Navbar from '../components/nav';

function ProfilePage() {
  const [user] = useState({
    name: 'John Doe',
    username: '@johndoe123',
    bio: 'MERN Stack Dev | I love coding & coffee ☕',
    profilePic: profilePic,
    location: 'New York, USA',
    profession: 'Software Engineer',
    phone: '+1 234 567 8901',
  });

  const [posts, setPosts] = useState([
    { id: 1, content: 'Excited to share my new project! 🚀', date: '2025-04-01', likes: 12 },
    { id: 2, content: 'Just had the best coffee ever! ☕❤️', date: '2025-03-29', likes: 7 }
  ]);

  const [reminders, setReminders] = useState([]);
  const [reminderInput, setReminderInput] = useState({ title: '', date: '' });

  const handleReminderSubmit = (e) => {
    e.preventDefault();
    if (reminderInput.title && reminderInput.date) {
      setReminders([...reminders, { ...reminderInput, id: Date.now() }]);
      setReminderInput({ title: '', date: '' });
    }
  };

  const handleLike = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post));
  };

  return (
    <>
      <div className="min-h-screen bg-[#f6f6f6] flex flex-col md:flex-row gap-6 py-10 px-4 md:px-16">
        
        {/* Profile Section */}
        <div className="bg-white md:w-[20%] h-fit w-full p-4 flex flex-col rounded-2xl shadow-lg items-center mb-10">
          <img src={user.profilePic} alt="profile" className="w-[100px] h-[100px] rounded-full object-cover shadow" />
          <h2 className="text-2xl mt-[10px] font-bold text-[#ff3131]">{user.name}</h2>
          <h2 className="text-[14px] font-bold text-[#737373]">{user.username}</h2>
          <div className="flex justify-between w-full bg-[#DFE1E5] rounded-[15px] gap-2 p-3 mt-[20px] text-center text-sm">
            <div className="flex-1"><strong>20k</strong><br />Followers</div>
            <div className="flex-1"><strong>10k</strong><br />Following</div>
            <div className="flex-1"><strong>{posts.length}</strong><br />Posts</div>
          </div>
          <p className="text-gray-600 text-center mt-[20px]">{user.bio}</p>
          <p className="text-sm text-gray-500 mt-1">📍 {user.location}</p>
          <p className="text-sm text-gray-500">💼 {user.profession}</p>
          <p className="text-sm text-gray-500">📞 {user.phone}</p>
        </div>

        {/* Middle Section */}
        <div className="flex-1 flex flex-col gap-6">
          <Post />

          {/* Posts List */}
          <div>
            <h3 className="text-xl font-semibold text-[#ff3131] mb-4">Your Posts</h3>
            <div className="space-y-4">
              {posts.map(post => (
                <div key={post.id} className="bg-white p-4 rounded-xl shadow relative">
                  <p className="text-gray-800">{post.content}</p>
                  <div className="flex justify-between mt-2 items-center text-gray-500 text-sm">
                    <span>{post.date}</span>
                    <div className="flex gap-4 items-center">
                      <button onClick={() => handleLike(post.id)} className="flex items-center gap-1 hover:text-[#ff3131]">
                        <FaRegHeart /> {post.likes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-[#ff3131]">
                        <FaRegCommentDots /> Comment
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Reminders */}
        <div className="bg-white w-full md:w-[30%] p-4 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-[#ff3131] mb-4">Set a Reminder</h3>

          <form onSubmit={handleReminderSubmit} className="flex gap-3 mb-4">
            <input
              type="text"
              name="title"
              value={reminderInput.title}
              onChange={(e) => setReminderInput({ ...reminderInput, title: e.target.value })}
              placeholder="Reminder Title"
              className="px-4 w-[40%] py-2 rounded-lg border border-gray-300 focus:outline-[#ff3131]"
            />
            <input
              type="date"
              name="date"
              value={reminderInput.date}
              onChange={(e) => setReminderInput({ ...reminderInput, date: e.target.value })}
              className="px-2 py-2 w-[40%] rounded-lg border border-gray-300 focus:outline-[#ff3131]"
            />
            <button
              type="submit"
              className="bg-[#ff3131] w-[20%] text-white px-6 py-1 rounded-[10px] hover:bg-[#bb1e1e] font-semibold "
            >
              Add
            </button>
          </form>
          {/* Display Reminders */}
          <ul className="space-y-2">
            {reminders.map(rem => (
              <li key={rem.id} className="text-gray-800 flex justify-between bg-[#fef6e4] p-3 rounded-lg">
                <span>{rem.title}</span>
                <span className="text-sm text-gray-600">{rem.date}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </>
  );
}

export default ProfilePage;
