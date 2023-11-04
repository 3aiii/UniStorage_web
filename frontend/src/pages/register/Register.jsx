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

  //สร้างตัวแปรสำหรับเก็บข้อความที่ต้องการแสดงเมื่อข้อมูลไม่ถูกต้องสำหรับแต่ละ Input
  const [fnameError, setFirstNameError] = useState('');
  const [lnameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // CONNECT ** REGISTER API **
  const HandleRegister = async (e) =>{
    e.preventDefault()

    if (!fname || !lname || !email || !username || !password) {
      setFirstNameError(!fname ? '*กรุณากรอกชื่อของคุณ' : '')
      setLastNameError(!lname ? '*กรุณากรอกนามสกุลของคุณ' : '')
      setEmailError(!email ? '*กรุณากรอกอีเมล' : '')
      setUsernameError(!username ? '*กรุณากรอกชื่อผู้ใช้ของคุณ' : '')
      setPasswordError(!password ? '*กรุณากรอกรหัสผ่าน' : '')
    } else{
        const Data = {
          username : username,
          password : password,
          fname : fname,
          lname : lname,
          email : email
        }
        
        try {
            await swal.fire({
              title: 'คุณต้องการบันทึกหรือไม่!',
              text: 'กรุณาตรวจสอบข้อมูลอีกครั้งก่อนกดปุ่มตกลง',
              icon: 'question',
              confirmButtonText: 'ตกลง',
              cancelButtonText: 'ยกเลิก',
              showCancelButton : true,
              preConfirm : async () =>{
                await axios.post("http://localhost:3000/api/Auth/register",Data)
                await swal.fire({
                  title: 'บันทึกข้อมูลเสร็จสิ้น',
                  icon: 'success',
                  confirmButtonText: 'ตกลง',
                  showCancelButton : false,
                  timer: 1200
                })
                window.location = '/login'
              }
            })
        } catch (error) {
          console.log(`Got some error = ${error}`);
        }
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
                {usernameError && <div className='error-message'>{usernameError}</div>}
                <input
                  type='text'
                  className='input-register'
                  placeholder='USERNAME'
                  onChange={(e)=> {
                    setUsername(e.target.value);
                    setUsernameError('');
                  }}                
                />
                {fnameError && <div className='error-message'>{fnameError}</div>}      
                <input
                  type='text'
                  className='input-register'
                  placeholder='FIRST NAME'
                  onChange={(e)=> {
                    setFirstName(e.target.value);
                    setFirstNameError('');
                  }}
                />
              </div>
              <div className='list-input-sec-col-register'>
                {passwordError && <div className='error-message'>{passwordError}</div>}
                <input
                  type='password'
                  className='input-register'
                  placeholder='PASSWORD'
                  onChange={(e)=> {
                    setPassword(e.target.value)
                    setPasswordError('');
                  }}            
                />
                {lnameError && <div className='error-message'>{lnameError}</div>}
                <input
                  type='text'
                  className='input-register'
                  placeholder='LAST NAME'
                  onChange={(e)=> {
                    setLastName(e.target.value);
                    setLastNameError('');
                  }}
                />
                
              </div>
            </div>
            <div className='list-input-single'>
              {emailError && <div className='error-message'>{emailError}</div>}
              <input
                type='text'
                className='input-register email'
                placeholder='EMAIL'
                onChange={(e)=> {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
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