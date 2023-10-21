import './NavBar.css'
import { Link } from 'react-router-dom'

const NavBar = () => {
    let admin 

    return (
        <div className='Container-NavBar'>
            <div className='main-box-NavBar'>
                <div className='Logo-and-Search-box'>
                    <Link to={'/'}>
                        <img
                            src='/src/assets/logoSDU/Main-logo.png'
                            alt='Main-logo-NavBar'
                            className='Img-NavBar'
                        />
                    </Link>
                    <div className='Search-Box'>
                        <i className="IconSearchNavBar fa-solid fa-magnifying-glass"></i>
                        <input
                            type='text'
                            className='search-NavBar'
                            placeholder='Search'
                        />
                    </div>
                </div>
                <div className='feature-NavBar'>
                    <Link to='/upload' className='link upload-NavBar'>
                        {/* <i class="fa-solid fa-file-import"></i> */}
                        <img
                            src='/src/assets/Paper-Upload.svg'
                            className='Img-Icon-Upload'
                            alt='Img-Icon-Upload'
                        />
                        Upload
                    </Link>
                    <Link to='/favorite' className='link Favorite-NavBar'>
                        <i className="IconFavorite fa-solid fa-heart"></i>
                    </Link>
                    <div className='Profile-NavBar'>
                        <img
                            src='/src/assets/ph_user-thin.png'
                            alt='Img-Icon-Profile'
                            className='Img-Icon-Profile'
                        />
                    </div>
                    <Link to='/login' className='link Logout-NavBar'>
                        <i class="IconLogout fa-solid fa-arrow-right-from-bracket"></i>
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NavBar