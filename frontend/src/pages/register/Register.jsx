import { useState } from 'react';
import './Register.css'
import axios from 'axios';
import swal from 'sweetalert2'

const Register = () => {
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // CONNECT ** REGISTER API **
  const HandleRegister = async (e) =>{
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:3000/api/Auth/register", {
        username : username,
        password : password,
        fname : fname,
        lname : lname,
        email : email
      })
      if (res){
        window.location = '/login'
        
      } else{
        console.log('something wrong !');
      }
    } catch (error) {
      console.log(`Got some error = ${error}`);
    }
  }
  
  return (
    <div className='Container-register'>
      <div className='main-box-register'>
        <form className='form-register' onSubmit={HandleRegister}>
          <div className='box-register'>
            <div className='box-register-img'>
              <img
                src='/src/assets/logoSDU/Main-logo.png'
                alt='Main-logo-SDU'
                className='Main-logo-img-register'
              />
            </div>
            <h1 className='h1-register'>ACCOUNT SIGN UP</h1>
            <div className='box-input-register'>
              <div className='list-input-first-col-register'>
                <input
                  type='text'
                  className='input-register'
                  placeholder='USERNAME'
                  onChange={(e)=> setUsername(e.target.value)}
                />
                <input
                  type='text'
                  className='input-register'
                  placeholder='FIRST NAME'
                  onChange={(e)=> setFirstName(e.target.value)}
                />
              </div>
              <div className='list-input-sec-col-register'>
                <input
                  type='password'
                  className='input-register'
                  placeholder='PASSWORD'
                  onChange={(e)=> setPassword(e.target.value)}
                  />
                <input
                  type='text'
                  className='input-register'
                  placeholder='LAST NAME'
                  onChange={(e)=> setLastName(e.target.value)}
                />
                
              </div>
            </div>
            <div className='list-input-single'>
              <input
                type='text'
                className='input-register email'
                placeholder='EMAIL'
                onChange={(e)=> setEmail(e.target.value)}
                />
            </div>
            <p className='p-alert-register'>*Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
            <button type='submit' className='button-register'>
              <i class="IconButtonRegister fa-solid fa-user-plus"></i>SIGN UP
            </button>          
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register