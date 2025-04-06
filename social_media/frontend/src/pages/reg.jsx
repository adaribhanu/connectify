import { useState } from 'react';
import { Link } from 'react-router-dom';
import loginIcon from '../assets/images/login_icon.png';


function Reg() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {  // ✅ Fixed API URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),  // ✅ Removed confirmPassword
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration Successful! 🎉');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert('Something went wrong. Please try again!');
    }
  };

  return (
    <div className="login_page bg-[#FFDE59] min-h-screen flex">
      <div className="w-[60%] flex items-center justify-center">
        <img src={loginIcon} alt="Login Icon" className="w-[500px] h-[500px]" />
      </div>
      <div className="login w-[40%] bg-white rounded-tl-[25px] rounded-bl-[25px] p-[10px] flex justify-center items-center" style={{ boxShadow: '3px 3px 10px 5px #957e23' }}>
        <div className="login_container h-[85%] w-[75%] flex flex-col items-center bg-[#D9DFE1] rounded-[25px]" style={{ boxShadow: '0px 0px 10px 3px #b7bcbd' }} >
          <h2 className="h-fit w-fit text-[#ff3131] text-[25px] font-bold mt-[55px]">Register</h2>
          <hr className="w-[90%] bg-[#FF3131] h-[1.6px] mt-[17px] border-0"/>
          <div className="email mt-[40px] w-[80%] h-[45px] bg-white rounded-[15px]  flex item-center hover:border-red-400 hover:shadow-lg focus-within:border-red-500 focus-within:shadow-sm transition duration-200 ease-in-out">
            <input 
              className="email_id w-full px-[10px] py-1 text-black font-bold font-[15px] rounded-[15px] placeholder:font-bold placeholder:text-[15px] border-none focus:outline-none"
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="username mt-[20px] w-[80%] h-[45px] bg-white rounded-[15px]  flex item-center hover:border-red-400 hover:shadow-lg focus-within:border-red-500 focus-within:shadow-sm transition duration-200 ease-in-out">
            <input 
              className="user_name w-full px-[10px] py-1 text-black font-bold font-[15px] rounded-[15px] placeholder:font-bold placeholder:text-[15px] border-none focus:outline-none"
              type="text"
              placeholder="Enter your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="password mt-[20px] w-[80%] h-[45px] bg-white rounded-[15px] flex item-center hover:border-red-400 hover:shadow-lg focus-within:border-red-500 focus-within:shadow-sm transition duration-200 ease-in-out">
            <input
              className="pass w-full px-[10px] py-1 text-black font-bold font-[15px] rounded-[15px] placeholder:font-bold placeholder:text-[15px] border-none focus:outline-none"
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="password mt-[20px] w-[80%] h-[45px] bg-white rounded-[15px] flex item-center hover:border-red-400 hover:shadow-lg focus-within:border-red-500 focus-within:shadow-sm transition duration-200 ease-in-out">
            <input
              className="pass w-full px-[10px] py-1 text-black font-bold font-[15px] rounded-[15px] placeholder:font-bold placeholder:text-[15px] border-none focus:outline-none"
              type="password"
              placeholder="Confirm your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className='orLogin w-[70%] flex justify-end text-sm font-bold mt-[10px]'>
            <Link to="/" className='register text-[#ff3131] hover:text-[#af2c2c]'>Login</Link>
          </div>

          <button className="login_btn w-[35%] h-[40px] rounded-[30px] bg-[#ff3131] text-white py-2 mt-[30px] border-none hover:bg-[#bb1e1e] transition font-bold text-[15px] flex items-center justify-center" style={{ boxShadow: '0px 1px 3px 0px #bb1e1e' }} 
          onClick={handleRegister}>Create Account</button>
          
        </div>
      </div>
    </div>
  );
}

export default Reg;
