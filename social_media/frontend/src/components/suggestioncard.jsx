import profile from "./assets/Images/profile.png";
function SuggestionCard() {
  return (
    <div className="bg-[#EBEBEB] flex w-[100%] h-[100%] bg-[#EBEBEB] rounded-[10px]  items-center">
      <img src={profile} alt='s profile' className="w-10 h-10 rounded-full mr-[3%]"/>
      <div className="bg-red w-[57%]">
        <p className="font -semibold text-black">Hema</p>
        <p className="text-[#737373]">emo bro</p>
      </div>
      <div className="flex flex-col justify-center items-center w-[23%] h-[100%] space-y-[4px]">
        <button className="bg-[#ED6A5E] rounded-[5px] w-[100%] p-[4px] text-white">Follow</button>
        <button className="rounded-[5px] w-[100%] bg-white p-[4px] text-[#ED6A5E]">Ignore</button>
      </div>
      
    </div>
  );
}
export default SuggestionCard;