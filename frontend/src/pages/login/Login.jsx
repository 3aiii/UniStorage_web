import { useState } from 'react';
import './Login.css'
import {Link} from "react-router-dom"; 
import axios from 'axios'
import swal from 'sweetalert2'


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:3000/api/Auth/login", {
        username : username,
        password : password
      })
      console.log(res.data.data);
      if (res){
        await swal.fire({
          title: 'ยินดีต้อนรับ!',
          text : `คุณ ${res.data.data[0].student_fname} ${res.data.data[0].student_lname}`,
          icon: 'success',    
          timer: 1200,
          timerProgressBar: true, 
          showConfirmButton : false
        }).then(()=>{
          localStorage.setItem('token',res.data.token)
          window.location = '/'
        })
      }      
    } catch (error) {
      console.log('something went wrong !');
    }
  }

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
            <form onSubmit={handleSubmit}>
              <div className='box-input-login'>
                <h1 className='h1-login'>ACCOUNT LOGIN</h1>
                {/* input username */}
                <input 
                  type='text'
                  placeholder='USERNAME'
                  className='input text-login'
                  onChange={(e)=> setUsername(e.target.value)}
                  />
                {/* input password */}
                <input 
                  type='password'
                  placeholder='PASSWORD'
                  className='input password-login'
                  onChange={(e)=> setPassword(e.target.value)}
                  />
                <button type='submit' className='button-login'>
                  <i class="IconButtonLogin fa-solid fa-circle-arrow-right"></i> 
                  LOGIN
                </button>
              </div>    
            </form>
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