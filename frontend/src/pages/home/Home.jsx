import { useEffect, useState } from 'react'
import NavBar from '../../components/Navbar/NavBar'
import Posts from '../../components/Posts/Posts'
import SideBar from '../../components/SideBar/SideBar'
import './Home.css'
import axios from 'axios'

const Home = () => {
  const [allPost,setAllPost] = useState([])
  
  // FecthPost API
  const fecthPost = async () =>{
    const res = await axios.get('http://localhost:3000/api/Post/getpost')
    // console.log(res.data.data);
    setAllPost(res.data.data)
  }

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
    fecthPost()
  },[])

  return (
    <div className='Container-Home'>
        <NavBar/>
        <div className='Main-Home'>
          <Posts allPost = {allPost}/>  
          <SideBar/>
        </div>
    </div>
  )
}

export default Home