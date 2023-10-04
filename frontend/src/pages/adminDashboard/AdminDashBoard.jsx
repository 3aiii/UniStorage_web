import DashPost from '../../components/DashPost/DashPost'
import NavBar from '../../components/Navbar/NavBar'
import './AdminDashBoard.css'

const AdminDashBoard = () => {
  return (
    <div className='Container-AdminDashBoard'>
      <NavBar/>
      <div className='Box-AdminDashBoard'>
        <DashPost/>
        <DashPost/>
        <DashPost/>
        <DashPost/>
        <DashPost/>
        <DashPost/>
        <DashPost/>
      </div>
    </div>
  )
}

export default AdminDashBoard