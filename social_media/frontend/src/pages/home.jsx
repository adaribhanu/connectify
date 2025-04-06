import Navbar from "../components/nav";
import Feed from "../components/feed";
import SpeedNav from "../components/speednav";

function Home() {
    return (
        <div className="min-h-screen bg-[#EBEBEB]"> 
            <Navbar />
            <div className="p-[20px] flex">
                <div className="w-[17.5%] h-full bg-[#EBEBEB] mr-[15px]">
                    <SpeedNav />
                </div>
                <div className="w-[60%] h-full bg-[#EBEBEB] flex ml-[25px] mr-[40px]">
                    <Feed />
                </div>
            </div>
        </div>
    );
}

export default Home;
