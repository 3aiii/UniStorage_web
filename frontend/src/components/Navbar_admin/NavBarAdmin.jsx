import'./NavBarAdmin.css'
import {Link} from 'react-router-dom'

const NavBarAdmin = () => {
  return (
    <div className='container-NavBarAdmin'>
        <div className='main-box-NavBar'>
            <div className='Logo-and-Search-box'>
                <Link to={'/adminDash'}>
                    <img
                        src='/src/assets/logoSDU/Main-logo.png'
                        alt='Main-logo-NavBar'
                        className='Img-NavBar'
                    />
                </Link>
            </div>
            <div className='feature-NavBar'>
                <div className='Profile-NavBar'>
                    <img
                        src='/src/assets/ph_user-thin.png'
                        alt='Img-Icon-Profile'
                        className='Img-Icon-Profile'
                    />
                </div>
                <Link to='/loginadmin' className='link Logout-NavBar'>
                    <i class="IconLogout fa-solid fa-arrow-right-from-bracket"></i>
                    Logout
                </Link>  
            </div>
        </div>
    </div>
  )
}

export default NavBarAdmin