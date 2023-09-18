import './Register.css'

const Register = () => {
  return (
    <div className='Container-register'>
      <div className='main-box-register'>
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
                placeholder='FIRST NAME'
              />
              <input
                type='text'
                className='input-register'
                placeholder='LAST NAME'
              />
              <input
                type='text'
                className='input-register'
                placeholder='EMAIL'
              />
            </div>
            <div className='list-input-sec-col-register'>
              <input
                type='text'
                className='input-register'
                placeholder='USERNAME'
              />
              <input
                type='password'
                className='input-register'
                placeholder='PASSWORD'
              />
              <input
                type='password'
                className='input-register'
                placeholder='CONFIRM PASSWORD'
              />
            </div>
          </div>
          <p className='p-alert-register'>*Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
          <button className='button-register'>
          <i class="IconButtonRegister fa-solid fa-user-plus"></i>SIGN UP
          </button>          
        </div>
      </div>
    </div>
  )
}

export default Register