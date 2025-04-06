import { Routes, Route } from 'react-router-dom';
import Login from './pages/login.jsx';
import Reg from './pages/reg.jsx';
import Home from './pages/home.jsx'
import SetupProfile from './pages/userSetup.jsx';
import ProfilePage from './pages/profile.jsx';

function App() {
  return (
    /*<Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Reg />} />
      <Route path="/home" element={<Home />} />
    </Routes>*/
    <ProfilePage/>
  );
}

export default App;
