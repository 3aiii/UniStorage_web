import { useEffect,useState } from 'react'
import NavBar from '../../components/Navbar/NavBar'
import Posts from '../../components/Posts/Posts'
import SideBar from '../../components/SideBar/SideBar'
import './Home.css'

const Home = () => {
  const [search, setSearch] = useState('');

  return (
    <div className='Container-Home'>
        <NavBar onSearchChange={setSearch} />
        <div className='Main-Home'>
          <Posts search={search} />  
          <SideBar/>
        </div>
    </div>
  )
}

export default Home