import profile from "../assets/Images/profile.png";
import stories from "../assets/Images/stories.png";
import image from "../assets/Images/image.png";
import memories from "../assets/Images/memories.png";

function Post() {
  return (
    <div className="w-[100%] h-[110px] bg-white rounded-[15px]">
      {/* Top row: profile image + input */}
      <div className="flex items-center space-x-[20px] pt-[15px] px-[20px]">
        <img src={profile} alt="Profile" className="w-10 h-10 rounded-full" />
        <input
          type="text"
          placeholder="What's happening?"
          className="w-[calc(100%-20px)] h-[40px] bg-[#DFE1E5] rounded-[10px] p-2 px-3 font-bold placeholder:font-bold placeholder-gray-500 border-none outline-none hover:border-red-400 hover:shadow-lg focus-within:border-red-500 focus-within:shadow-sm transition duration-200 ease-in-out"
        />
      </div>

      {/* Bottom row: upload buttons + post */}
      <div className="flex items-center justify-between px-[20px] mt-[10px]">
        <div className="flex gap-2">
          <button className="group hover:bg-[#E4E6EB] p-2 px-2 rounded-[10px] flex items-center gap-1 transition duration-300 ease-in-out">
            <img src={image} alt="Icon" className="w-5 h-5" />
            <p className="font-semibold text-[#737373] text-[11px] group-hover:text-[#35383C] transition duration-300 ease-in-out">
              Upload Image
            </p>
          </button>

          <button className="group hover:bg-[#E4E6EB] p-2 px-2 rounded-[10px] flex items-center gap-1 transition duration-300 ease-in-out">
            <img src={memories} alt="Icon" className="w-5 h-5" />
            <p className="font-semibold text-[#737373] text-[11px] group-hover:text-[#35383C] transition duration-300 ease-in-out">
              Upload Memories
            </p>
          </button>

          <button className="group hover:bg-[#E4E6EB] p-2 px-2 rounded-[10px] flex items-center gap-1 transition duration-300 ease-in-out">
            <img src={stories} alt="Icon" className="w-5 h-5" />
            <p className="font-semibold text-[#737373] text-[11px] group-hover:text-[#35383C] transition duration-300 ease-in-out">
              Share Stories
            </p>
          </button>
        </div>

        <button className="bg-[#ED6A5E] text-white font-semibold text-[18px] rounded-[10px] px-[20px] hover:bg-[#FF3131] transition duration-300 ease-in-out">
          Post
        </button>
      </div>
    </div>
  );
}

export default Post;
