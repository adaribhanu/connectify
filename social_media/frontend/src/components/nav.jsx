import profile_icon from "../assets/Images/profile.png";
import bell from "../assets/Images/bell.png";
import settings from "../assets/Images/settings.png";
import search from "../assets/Images/search.png";

function Navbar(){
    return(
        <nav className="h-[10%] w-[calc(100%-20px)] bg-white p-[4px] mt-[10px] mx-[10px]  flex justify-between items-center shadow-md rounded-[10px]">
            <h1 className="text-3xl font-bold ml-[20px]">Connectify</h1>
            <div className="flex justify-between gap-[15px] items-center px-[15px]">
                <div className="flex items-center bg-[#DFE1E5] border-2 border-gray-300 hover:border-red-400 hover:shadow-lg focus-within:border-red-500 focus-within:shadow-sm transition duration-200 ease-in-out rounded-[20px] p-1 pl-3 ">
                    <input type="text" placeholder="Search Something...." className="font-bold placeholder:font-bold placeholder-gray-500 w-[260px] h-[100%] border-none outline-none"/>
                    <button className="bg-[#DFE1E5] rounded flex items-center hover:bg-[#E4E6EB] transition duration-300 ease-in-out">
                        <img src={search} alt="Icon" className="w-7 h-7" />
                    </button>
                </div>
                <button className="bg-[#DFE1E5] p-2 rounded flex items-center gap-2 rounded-[30px] hover:shadow-md hover:bg-[#ADAEAF] transition duration-200 ease-in-out">
                    <img src={settings} alt="Icon" className="w-5 h-5" />
                </button>
                <button className="bg-[#DFE1E5] p-2 px-[10px] rounded flex items-center gap-2 rounded-[30px] hover:shadow-md hover:bg-[#ADAEAF] transition duration-200 ease-in-out">
                    <img src={bell} alt="Icon" className="w-4 h-5" />
                </button>
                <div className="">
                    <p className="font-semibold">username</p>
                    <p className="text-sm text-[#737373] text-center">123</p>
                </div>
                <button>
                    <img src={profile_icon} alt="Icon" className="w-10 h-10 rounded-full "/>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;