import { useDispatch, useSelector } from 'react-redux';
import './NavBarAdmin.css'
import {Link} from 'react-router-dom'
import { logout } from '../../context/authSlice';
import swal from 'sweetalert2';

const NavBarAdmin = () => {
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
            }}
        )  
    }

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
                        <div className='icon'>
                            <i class="fa-regular fa-user"></i>
                        </div>
                        <span className='Profile-Name'>{user.teacher_username}</span>
                    </div>
                    <button className='link Logout-NavBar' onClick={HandleLogout}>
                        <i class="IconLogout fa-solid fa-arrow-right-from-bracket"></i>
                        Logout
                    </button>  
                </div>
            </div>
        </div>
    )
}

export default NavBarAdmin