import { useLocation } from 'react-router-dom'
import SideBarTierList from '../SideBarTierList/SideBarTierList'
import './SideBar.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

const SideBar = () => {
  // const location = useLocation().pathname.split('/')[2]
  // const [singlePost,setSinglPost] = useState([])

  // const feacthPostTierList = async () =>{
  //   const res = await axios.get(`http://localhost:3000/api/Post/${location}`)
  //   setSinglPost(res.data.data[0])
  // }

  // useEffect(()=>{
  //   feacthPostTierList()
  // },[])

  return (
    <div className='Container-SideBar'>
      <div className='Main-Box-SideBar'>
        <h1 className='h1-TopFive'>TOP 5 MOST VIEWED</h1>
        <div className='TierList-box'>
          <SideBarTierList/>
          <SideBarTierList/>
          <SideBarTierList/>
          <SideBarTierList/>
          <SideBarTierList/>
        </div>
      </div>
    </div>
  )
}

export default SideBar