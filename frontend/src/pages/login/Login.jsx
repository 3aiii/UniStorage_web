import './Login.css'
import {Link} from "react-router-dom"; 

const Login = () => {
  return (
    <div className='Container-login'>
      <div className='main-box-login'>
        <div className='box-login'>
        <div className='box-img'>
          <img
            src='/src/assets/logoSDU/Main-logo.png'
            alt='Main-logo-SDU'
            className='Main-logo-img'
          />
        </div>
          <div className='box-input-login'>
            <h1 className='h1-login'>ACCOUNT LOGIN</h1>
            {/* input username */}
            <input 
              type='text'
              placeholder='USERNAME'
              className='input text-login'
            />
            {/* input password */}
            <input 
              type='password'
              placeholder='PASSWORD'
              className='input password-login'
            />
            <button className='button-login'>
              <i class="fa-solid fa-circle-arrow-right"></i> 
              LOGIN
            </button>
          </div>
          <div className='ask-login'>
            <p className='p-login'>Don’t have an account yet ?</p>
            <Link to={'/register'} className='link SignUp-login'>SIGN UP</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login