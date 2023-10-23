import { useEffect } from 'react'
import NavBar from '../../components/Navbar/NavBar'
import Posts from '../../components/Posts/Posts'
import SideBar from '../../components/SideBar/SideBar'
import './Home.css'

const Home = () => {
  // Authen API
  const Authen = async () =>{
    // const token = localStorage.getItem('token')
    // await axios.post("http://localhost:3000/api/Auth/authen",{
    //   headers : {
    //     'Authorization': `Bearer ${token}`
    //   }
    // }).then((res) => {
    //   if (res.data.status === 'ok'){
    //     alert('authen success !')
    //   } else{
    //     alert('authen fail')
    //     window.location = '/login'        
    //   }
    // })
  } 

  useEffect(()=>{
    Authen()
  },[])

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