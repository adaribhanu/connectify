import './login.css';

function Reg(){
    return (
        <>
        <div className="image">
        </div>
        <div className="login">
          <div className="login_container">
            <h2>
                Register
            </h2>
            <vl/>
            <div className='phno'>
                <input className='phone' type="text" placeholder='Enter your Email / Username' ></input>
            </div>
            <div className='password'>
                <input className='pass' type="password" placeholder='Enter your Password' ></input>
            </div>
            <div className='password'>
                <input className='pass' type="password" placeholder='Confirm your Password' ></input>
            </div>
            <div className='orLogin'>
                <a href='#' className='register'>Login</a>
            </div>
    
            <button className='login_btn'>SUBMIT</button>
            <div className='orbtw_reg'>
                <h4 className='dots'></h4>
                <h4 className='or'> or </h4>
                <h4 className='dots'></h4>
            </div>
            <button className='google_btn'>
                <img src='https://img.icons8.com/color/48/000000/google-logo.png' alt='Google Login' className='google_logo'/>
                <span>Login with google account</span>
            </button>
            
          </div>
        </div>
        </>
      );
}

export default Reg;