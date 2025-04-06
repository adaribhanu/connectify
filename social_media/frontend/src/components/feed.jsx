import Post from "./post";
function Feed() {
  return (
    <div className="w-[100%] h-[100%] bg-[#EBEBEB] flex space-x-[4.5%]">
      <div className="bg-[#EBEBEB] h-[100%] w-[62%]">
        <Post/>
      </div>
      <div className="bg-red-500 h-[100%] w-[33%]">
        <h1>kjbdu</h1>
      </div>
    </div>
  );
}
export default Feed;