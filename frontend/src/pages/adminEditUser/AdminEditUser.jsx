import DashEditUserPost from '../../components/DashEditUserPost/DashEditUserPost'
import NavBarAdmin from '../../components/Navbar_admin/NavBarAdmin'
import './AdminEditUser.css'

const AdminEditUser = () => {
  return (
    <div className='container-AdminEditUser'>
        <NavBarAdmin/>
        <div className='Main-AdminEditUser'>
            <div className='Search-AdminEditUser'>
                <i className="IconSearch fa-solid fa-magnifying-glass"></i>
                <input
                    type='text'
                    className='search-AdminEditUser'
                    placeholder='Search'
                />
            </div>
            <div className='info-AdminEditUser'>
                <DashEditUserPost/>
                <DashEditUserPost/>
                <DashEditUserPost/>
                <DashEditUserPost/>
                <DashEditUserPost/>
                <DashEditUserPost/>
            </div>
        </div>
            
    </div>
  )
}

export default AdminEditUser