import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import profile1 from '../assets/images/profile.png';
import profile2 from '../assets/images/girl_profile.png';
import profile3 from '../assets/images/man_profile.png';
import profile4 from '../assets/Images/girl.png';
import profile5 from '../assets/images/boy.png';
import profile6 from '../assets/Images/woman.png';

function SetupProfile() {
  const [form, setForm] = useState({
    name: '',
    username: '',
    dob: '',
    bio: '',
    location: '',
    profession: '',
    phone: '',
    profilePic: profile1
  });
  
  const [usernameEdited, setUsernameEdited] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'name') {
      const baseUsername = value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '_');
      const generated = `@${baseUsername}${Math.floor(Math.random() * 1000)}`;
  
      setForm((prev) => ({
        ...prev,
        name: value,
        username: usernameEdited ? prev.username : generated
      }));
    } else if (name === 'username') {
      setUsernameEdited(true);
      const usernameWithAt = value.startsWith('@') ? value : `@${value}`;
      setForm((prev) => ({ ...prev, username: usernameWithAt }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/user/profile-setup', form);
      navigate('/home');
    } catch (err) {
      console.error(err);
    }
  };

  const handleProfilePicChange = (img) => {
    setForm({ ...form, profilePic: img });
  };

  return (
    <div className="bg-[#FFDE59] min-h-screen flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-6xl rounded-[25px] shadow-lg flex flex-col md:flex-row overflow-hidden">
        
        {/* Form Section */}
        <div className="w-full md:w-2/3 p-8">
          <h2 className="text-[26px] font-bold text-[#ff3131] mb-6">Complete Your Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name and Username */}
            <div className="flex flex-col md:flex-row gap-4">
              {['name', 'username'].map((field) => (
                <div key={field} className="w-full h-[45px] bg-[#DFE1E5] rounded-[15px] flex items-center hover:border-red-400 hover:shadow-lg focus-within:border-red-500 focus-within:shadow-sm transition duration-200 ease-in-out">
                  <input
                    className="w-full px-[10px] py-1 text-black font-bold text-[15px] rounded-[15px] placeholder:font-bold border-none focus:outline-none"
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={form[field]} 
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>

            {/* Other input fields */}
            {['location', 'profession', 'phone'].map((field) => (
              <div key={field} className="w-full h-[45px] bg-[#DFE1E5] rounded-[15px] flex items-center hover:border-red-400 hover:shadow-lg focus-within:border-red-500 focus-within:shadow-sm transition duration-200 ease-in-out">
                <input
                  className="w-full px-[10px] py-1 text-black font-bold text-[15px] rounded-[15px] placeholder:font-bold border-none focus:outline-none"
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  onChange={handleChange}
                />
              </div>
            ))}

            {/* DOB */}
            <div className="w-full h-[45px] bg-[#DFE1E5] rounded-[15px] flex items-center hover:border-red-400 hover:shadow-lg focus-within:border-red-500 focus-within:shadow-sm transition duration-200 ease-in-out">
              <input 
                className="w-full px-[10px] py-1 text-black font-bold text-[15px] rounded-[15px] placeholder:font-bold border-none focus:outline-none"
                name="dob"
                type="date"
                onChange={handleChange}
              />
            </div>

            {/* Bio */}
            <textarea
              name="bio"
              placeholder="Short Bio"
              onChange={handleChange}
              className="w-full p-3 rounded-[15px] bg-[#DFE1E5] font-semibold text-black placeholder:font-semibold focus:outline-none"
              rows="3"
            ></textarea>

            {/* Submit */}
            <button
              type="submit"
              className="w-[35%] h-[40px] rounded-[30px] bg-[#ff3131] text-white py-2 border-none hover:bg-[#bb1e1e] transition font-bold text-[15px] flex items-center justify-center"
              style={{ boxShadow: '0px 1px 3px 0px #bb1e1e' }}>
              Submit
            </button>
          </form>
        </div>

        {/* Separator */}
        <div className="hidden md:block w-[2px] bg-gray-300 my-8"></div>

        {/* Profile Image Section */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-6">
          <div className="w-[200px] h-[200px] rounded-[30px] bg-gray-300 overflow-hidden shadow-md mb-4 flex flex-col items-center justify-center">
            <img
              src={form.profilePic}
              alt="Profile Preview"
              className="w-24 h-24 object-cover rounded-full"
            />
          </div>

          <p className="font-semibold text-center text-[#ff3131] mt-2">Choose Your Profile Picture</p>

          {/* Picture Options */}
          <div className="flex flex-wrap justify-center gap-4 mt-4 max-w-[240px]">
            {[profile1, profile2, profile3, profile4, profile5, profile6].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Option ${index + 1}`}
                className={`w-14 h-14 rounded-full border-2 cursor-pointer transition duration-200 ${
                  form.profilePic === img ? 'border-[#ff3131]' : 'border-transparent'
                }`}
                onClick={() => handleProfilePicChange(img)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetupProfile;
