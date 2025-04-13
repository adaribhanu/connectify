import Post from "./post";
import PostCard from "./PostCard";

function Feed() {
  return (
    <div className="w-full h-full bg-[#EBEBEB] flex space-x-[4.5%] px-4 py-4 scrollbar-hide">
      {/* Left Section with posts */}
      <div className="bg-[#EBEBEB] h-full w-[62%] flex flex-col space-y-6">
        <Post />
        <PostCard />
      </div>

      {/* Right Sidebar */}
      <div className="bg-white h-full w-[33%] rounded-xl p-4 space-y-6 shadow-md">
        {/* Suggestions Section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-gray-700">Suggestions</h2>
            <button className="text-sm text-blue-500 font-medium">See All</button>
          </div>
          <div className="space-y-2">
            <UserCard name="Mark" username="@mark05" />
            <UserCard name="Maddock" username="@dare_devil" />
          </div>
        </div>

        {/* Remainders Section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-gray-700">Remainders</h2>
            <button className="text-sm text-blue-500 font-medium">See All</button>
          </div>
          <UserCard name="Mark" username="@mark05" />
        </div>

        {/* Birthdays Section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-gray-700">Birthdays</h2>
            <button className="text-sm text-gray-400 text-xl">&times;</button>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
              T
            </div>
            <div>
              <p className="text-sm font-medium">Tony on 4th, Jan</p>
              <p className="text-xs text-gray-500">@iam_Ironman</p>
            </div>
          </div>
        </div>
      </div>
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
