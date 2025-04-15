import { User, MessageCircle, Bell, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SpeedNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear stored user data
    localStorage.removeItem('token');       // If you're storing token
    localStorage.removeItem('userInfo');    // Remove user info
    
    // Optionally clear all:
    // localStorage.clear();
    
    navigate('/login'); // Redirect to login
  };

  return (
    <div className="rounded-[15px] bg-white shadow-md h-full w-full p-4 flex flex-col gap-4">
      <Link to="/profile" className="flex items-center gap-3 text-left p-3 rounded-lg hover:bg-[#f3f3f3] font-semibold transition">
        <User className="w-5 h-5 text-[#ff3131]" />
        Profile
      </Link>

      <button className="flex items-center gap-3 text-left p-3 cursor-pointer rounded-lg hover:bg-[#f3f3f3] font-semibold transition">
        <MessageCircle className="w-5 h-5 text-[#ff3131]" />
        Messages
      </button>

      <button className="flex items-center gap-3 text-left p-3 cursor-pointer rounded-lg hover:bg-[#f3f3f3] font-semibold transition">
        <Bell className="w-5 h-5 text-[#ff3131]" />
        Notifications
      </button>

      <button className="flex items-center gap-3 text-left p-3 cursor-pointer rounded-lg hover:bg-[#f3f3f3] font-semibold transition">
        <Settings className="w-5 h-5 text-[#ff3131]" />
        Settings
      </button>

      <div className="mt-auto w-full">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full text-left p-3 cursor-pointer rounded-lg hover:bg-[#ffeaea] text-[#ff3131] font-semibold transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default SpeedNav;
