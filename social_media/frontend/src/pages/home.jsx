import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/nav";
import Feed from "../components/feed";
import SpeedNav from "../components/speednav";

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
  
        <div className="flex h-full flex-1 p-[20px] overflow-hidden ">
          <div className="w-[17.5%] mr-[15px] h-full">
            <SpeedNav />
          </div>
          <div className="w-[60%] h-full overflow-y-auto mr-[40px] n0-scrollbar">
            <Feed />
          </div>
        </div>
      </div>
    );
  }
  
export default Home;
