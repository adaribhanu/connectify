import { useState } from "react";
import axios from "axios";
import profile_icon from "../assets/Images/profile.png";
import stories from "../assets/Images/stories.png";
import image from "../assets/Images/image.png";
import memories from "../assets/Images/memories.png";

function Post({ onPostSubmit }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
      setSelectedFile(file);
    } else {
      alert("Please select a valid image or video file");
    }
  };

  const removeFile = () => setSelectedFile(null);

  const handlePost = async () => {
    if (!caption && !selectedFile) return alert("Post cannot be empty.");

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("image", selectedFile);
      formData.append("username", userInfo.username || "Anonymous");

      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });                                                                                   
      
      const newPost = res.data.post;
      onPostSubmit?.(newPost);
      

      onPostSubmit?.(res.data.post);
      setCaption("");
      setSelectedFile(null);
      alert("Post uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload post");
    }
  };

  return (
    <div className="w-full bg-white rounded-[15px] p-4">
      <div className="flex items-center space-x-4 mb-3">
        <img
          src={userInfo.profilePic || profile_icon}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <input
          type="text"
          placeholder="What's happening?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="flex-1 h-[40px] bg-[#DFE1E5] rounded-[10px] px-3 font-bold placeholder:font-bold"
        />
      </div>

      {selectedFile && (
        <div className="relative flex justify-center mb-4">
          {selectedFile.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
              className="w-[80%] rounded-lg shadow-md"
            />
          ) : (
            <video
              controls
              src={URL.createObjectURL(selectedFile)}
              className="w-[80%] rounded-lg shadow-md"
            />
          )}
          <button
            onClick={removeFile}
            className="absolute top-[-7.5px] right-[calc(31%-150px)] bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {[
            { icon: image, label: "Upload Image", id: "imageUpload", accept: "image/*" },
            { icon: memories, label: "Upload Memories", id: "memoriesUpload", accept: "image/*" },
            { icon: stories, label: "Share Story", id: "storiesUpload", accept: "video/*" },
          ].map(({ icon, label, id, accept }) => (
            <label key={id} htmlFor={id} className="cursor-pointer">
              <input
                type="file"
                id={id}
                accept={accept}
                className="hidden"
                onChange={handleFileUpload}
              />
              <div className="group hover:bg-[#E4E6EB] p-2 rounded-[10px] flex items-center gap-1">
                <img src={icon} alt="Icon" className="w-5 h-5" />
                <p className="font-semibold text-[#737373] text-[11px] group-hover:text-[#35383C]">
                  {label}
                </p>
              </div>
            </label>
          ))}
        </div>

        <button
          onClick={handlePost}
          className="bg-[#ED6A5E] text-white font-semibold text-[18px] rounded-[10px] px-[20px] hover:bg-[#FF3131]"
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default Post;
