import './Favorite.css'
import NavBar from '../../components/Navbar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import Favorites from '../../components/Favorites/Favorites'

const Favorite = () => {
  return (
    <div className='Container-Favorite'>
        <NavBar/>
        <div className='box-Favorite'>
          <Favorites />
          <SideBar/>
        </div>
    </div>
  )
}

export default Favorite