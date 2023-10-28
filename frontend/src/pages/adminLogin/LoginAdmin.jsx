import './LoginAdmin.css'
import axios from 'axios'
import swal from 'sweetalert2'
import { useState } from 'react';

const LoginAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) =>{
      e.preventDefault()
      try {
        const res = await axios.post("http://localhost:3000/api/Auth/loginadmin", {
          username : username,
          password : password
        })

        if (res){
          await swal.fire({
            title: 'ยินดีต้อนรับ!',
            text : `คุณ ${res.data.data[0].teacher_fname} ${res.data.data[0].teacher_lname}`,
            icon: 'success',    
            timer: 1200,
            timerProgressBar: true, 
            showConfirmButton : false
          }).then(()=>{
            localStorage.setItem('token',res.data.token)
            window.location = '/adminDash'
          })
        }      
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <div className='Container-login-admin'>  
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
                  <h1 className='h1-login-admin'>ADMIN LOGIN</h1>
                  {/* input username */}
                  <input 
                    type='text'
                    placeholder='USERNAME'
                    className='input-admin text-login'
                    onChange={(e)=> setUsername(e.target.value)}
                    />
                  {/* input password */}
                  <input 
                    type='password'
                    placeholder='PASSWORD'
                    className='input-admin password-login'
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                  <button type='submit' className='button-login-admin'>
                    <i class="IconButtonLogin fa-solid fa-circle-arrow-right"></i> 
                    LOGIN
                  </button>
                </div>    
              </form>
          </div>
        </div>
      </div>
    )
}

export default LoginAdmin