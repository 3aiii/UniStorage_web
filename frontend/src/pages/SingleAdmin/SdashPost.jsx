import './SdashPost.css'
import NavBarAdmin from '../../components/Navbar_admin/NavBarAdmin'
import SingleAdminDash from '../../components/singleAdminDash/SingleAdminDash'

const SdashPost = () => {
  return (
    <div className='Container-SdashPost'>
        <NavBarAdmin/>
        <SingleAdminDash/>
    </div>
  )
}

export default SdashPost