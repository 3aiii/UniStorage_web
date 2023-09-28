import NavBar from '../../components/Navbar/NavBar'
import Posts from '../../components/Posts/Posts'
import SideBar from '../../components/SideBar/SideBar'
import './Home.css'

const Home = () => {
  return (
    <div className='Container-Home'>
        <NavBar/>
        <div className='Main-Home'>
          <Posts/>
          <SideBar/>
        </div>
    </div>
  )
}

export default Home