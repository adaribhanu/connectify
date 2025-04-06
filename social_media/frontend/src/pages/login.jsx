import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginIcon from '../assets/images/login_icon.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login Successful! 🎉');
        localStorage.setItem('token', data.token);
        navigate('/home');
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
          <h2 className="h-fit w-fit text-[#ff3131] text-[25px] font-bold mt-[55px]">Login</h2>
          <hr className="w-[90%] bg-[#FF3131] h-[1.6px] mt-[17px] border-0" />
          <div className="email mt-[40px] w-[80%] h-[45px] bg-white rounded-[15px]  flex item-center hover:border-red-400 hover:shadow-lg focus-within:border-red-500 focus-within:shadow-sm transition duration-200 ease-in-out">
            <input 
              className="email_id w-full px-[10px] py-1 text-black font-bold font-[15px] rounded-[15px] placeholder:font-bold placeholder:text-[15px] border-none focus:outline-none"
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <div className="reg_and_forgot w-[70%] flex justify-between text-sm font-bold mt-[10px]">
            <Link to="/register" className="register text-[#ff3131] hover:text-[#af2c2c]">Register</Link>
            <a href="#" className="forgot text-[#ff3131] hover:text-[#af2c2c]">Forgot Password?</a>
          </div>

          <button className="login_btn w-[35%] h-[40px] rounded-[30px] bg-[#ff3131] text-white py-2 mt-[30px] border-none hover:bg-[#bb1e1e] transition font-bold text-[15px] flex items-center justify-center" style={{ boxShadow: '0px 1px 3px 0px #bb1e1e' }} 
          onClick={handleLogin}
          >SUBMIT
          </button>

          <div className="orbtw h-[10%] w-[85%] flex items-center justify-center text-[#d9dfe1] mt-[15px] mb-[15px]">
            <div className="dots bg-[#d9dfe1] flex-grow h-0 m-0 border-b border-dotted border-black" />
            <h4 className="h-full w-[10%] flex items-center justify-center text-black px-2"> or </h4>
            <div className="dots bg-[#d9dfe1] flex-grow h-0 m-0 border-b border-dotted border-black" />
          </div>

          <button className="google_btn w-[80%] p-[12px] pl-[6px] h-[45px] flex items-center rounded-[30px] text-black bg-white font-bold text-[15px] hover:bg-gray-100 transition" style={{ boxShadow: '0px 4px 4px 0px #b7babb' }}>
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google Login"
              className="google_logo w-[30px] h-[30px]"
            />
            <span className="flex-grow text-center text-base font-roboto font-bold">Login with Google Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
