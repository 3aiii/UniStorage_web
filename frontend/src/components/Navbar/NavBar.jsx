import { useDispatch, useSelector } from 'react-redux';
import './NavBar.css'
import { Link } from 'react-router-dom'
import swal from 'sweetalert2';
import { logout } from '../../context/authSlice';
import { useState } from 'react';
import { setSearch } from '../../context/searchSlice.js'

const NavBar = ({isSearchBoxVisible}) => {

    const dispatch = useDispatch();
    const { user } = useSelector((state)=> state.auth)
 
    // LOGOUT BUTTON
    const HandleLogout = async () =>{
        await swal.fire({
            title: 'คุณต้องการจะออกจากระบบหรือไม่?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'ออกจากระบบ',
            confirmButtonColor: '#d33',
            cancelButtonText: 'ยกเลิก',  
            preConfirm: () =>{
                dispatch(logout())
            }
          }
        )  
    }

    const handleSearchChange = (value) => {
        dispatch(setSearch(value));
    };

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
                    {
                        isSearchBoxVisible && (
                            <div className='Search-Box'>
                                <i className="IconSearchNavBar fa-solid fa-magnifying-glass"></i>
                                <input
                                    type='text'
                                    className='search-NavBar'
                                    placeholder='Search'
                                    onChange={(e)=>{
                                        handleSearchChange(e.target.value)    
                                    }}
                                />
                            </div>
                        )
                    }
                </div>
                <div className='feature-NavBar'>
                    <Link to='/upload' className='link upload-NavBar'>
                        <img
                            src='/src/assets/Paper-Upload.svg'
                            className='Img-Icon-Upload'
                            alt='Img-Icon-Upload'
                        />
                        Upload
                    </Link>
                    <Link to='/mypost' className='link mypost-NavBar'>
                        <i class="IconMypost fa-regular fa-newspaper"></i>
                        <p>My Post</p>
                    </Link>
                    <Link to={`/favorite/${user.student_id}`} className='link Favorite-NavBar'>
                        <i className="IconFavorite fa-solid fa-heart"></i>
                        
                    </Link>
                    <div className='Profile-NavBar'>
                        <img
                            src='/src/assets/ph_user-thin.png'
                            alt='Img-Icon-Profile'
                            className='Img-Icon-Profile'
                        />
                    </div>
                    <button onClick={HandleLogout} className='link Logout-NavBar'>
                        <i class="IconLogout fa-solid fa-arrow-right-from-bracket"></i>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NavBar