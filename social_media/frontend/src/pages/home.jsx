import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/nav";
import Feed from "../components/feed";
import SpeedNav from "../components/speednav";
import ChatApp from "../components/ChatApp";

function Home() {
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
    }, [navigate]);
  
    return (
      <div className="h-screen flex flex-col bg-[#EBEBEB]"> 
        <Navbar />
  
        <div className="flex h-full flex-1 p-[20px] pb-[0px] overflow-hidden ">
          <div className="w-[17.5%]  pb-[20px] h-full">
            <SpeedNav />
          </div>
          <div className="w-[60%] h-full overflow-y-auto px-[20px] mb-20px n0- scrollbar-hide">
            <Feed />
          </div>
          <div className="w-[17.5%]  pb-[20px] h-full">
            <ChatApp />
          </div>
        </div>
      </div>
    );
  }
  
export default Home;
