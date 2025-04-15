import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/login.jsx';
import Reg from './pages/reg.jsx';
import Home from './pages/home.jsx';          
import SetupProfile from './pages/userSetup.jsx';
import ProfilePage from './pages/profile.jsx';  
import SuggestionsSection from "./components/SuggestionsSection.jsx";
import ChatApp from "./components/ChatApp.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Reg />} />
      <Route path="/home" element={<Home />} />
      <Route path="/SetupProfile" element={<SetupProfile />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;