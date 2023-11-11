import './LoginAdmin.css'
import axios from 'axios'
import swal from 'sweetalert2'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../context/authSlice';

const LoginAdmin = () => {
    const [projectNameError, setProjectNameError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const TextFail = [
      'username และ password ไม่ถูกต้อง,โปรดตรวจสอบอีกครั้ง !',
      'โปรดกรอก username !',
      'โปรดกรอก password !',
      'โปรดกรอก username และ password !'
    ]

    // ADMIN LOGIN BUTTON 
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
            text : `คุณ ${res.data.data.teacher_fname} ${res.data.data.teacher_lname}`,
            icon: 'success',    
            timer: 1200,
            timerProgressBar: true, 
            showConfirmButton : false
          }).then(()=>{
            dispatch(login(res.data.data))
          })
        }      
      } catch (error) {
        !username && !password ? setProjectNameError(TextFail[3]) :
        !username ? setProjectNameError(TextFail[1]) :
        !password ? setProjectNameError(TextFail[2]) : 
        setProjectNameError(TextFail[0])      
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
                  <p className='error-text'>{projectNameError}</p>
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