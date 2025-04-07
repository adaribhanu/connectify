import Post from "./post";
import PostCard from "./PostCard";

function Feed() {
  return (
    <div className="w-full h-full bg-[#EBEBEB] flex space-x-[4.5%] px-4">
      {/* Left Section with posts */}
      <div className="bg-[#EBEBEB] h-full w-[62%] flex flex-col space-y-6">
        <Post />
        <PostCard />
        
      </div>

      {/* Right Sidebar */}
      <div className="bg-red-500 h-full w-[33%]">
        <h1>kjbdu</h1>
      </div>
    </div>
  );
}

export default Feed;
