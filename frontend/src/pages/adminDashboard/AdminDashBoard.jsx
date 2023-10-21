import { Link } from 'react-router-dom'
import DashPost from '../../components/DashPost/DashPost'
import NavBarAdmin from '../../components/Navbar_admin/NavBarAdmin'
import './AdminDashBoard.css'

const AdminDashBoard = () => {
  return (
    <div className='Container-AdminDashBoard'>
      <NavBarAdmin/>
      <div className='Box-AdminDashBoard'>
        <DashPost/>
        <DashPost/>
        <DashPost/>
        <DashPost/>
        <DashPost/>
        <DashPost/>
        <DashPost/>
        <DashPost/>
        <DashPost/>
        <DashPost/>
        <DashPost/>
        <DashPost/>
      </div>
      <Link className='link LinkadminEditUser' to='/adminEditUser'>
        <i class="IconEdit-AdminDashBoard fa-regular fa-pen-to-square"></i>
        แก้ไขข้อมูลนักศึกษา
      </Link>
    </div>
  )
}

export default AdminDashBoard