import Post from "./post";
import PostCard from "./PostCard";
import SuggestionsSection from "./SuggestionsSection.jsx";

function Feed() {
  return (
    <div className="w-full h-full bg-[#EBEBEB] flex space-x-[4.5%] px-4  scrollbar-hide">
      <div className="bg-[#EBEBEB] h-full w-[62%] flex flex-col space-y-6">
        <Post />
        <PostCard />
      </div>
      <SuggestionsSection/>
    </div>
  );
}

// Reusable component for user card
const UserCard = ({ name, username }) => {
  return (
    <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
          {name[0]}
        </div>
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-gray-500">{username}</p>
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        <button className="text-white bg-red-500 px-3 py-1 text-xs rounded-full">+ Follow</button>
        <button className="text-gray-500 text-xs hover:text-red-500">× Ignore</button>
      </div>
    </div>
  );
};

export default Feed;
