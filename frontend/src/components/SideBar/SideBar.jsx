import SideBarTierList from '../SideBarTierList/SideBarTierList'
import './SideBar.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

const SideBar = () => {
  const [singlePost,setSinglPost] = useState([])

  const feacthPostTierList = async () =>{
    const res = await axios.get(`http://localhost:3000/api/Post/`)
    setSinglPost(res.data.data)
  }

  useEffect(()=>{
    feacthPostTierList()
  },[])

  return (
    <div className='Container-SideBar'>
      <div className='Main-Box-SideBar'>
        <h1 className='h1-TopFive'>
          {/* <i className="IconRank fa-solid fa-ranking-star"></i>  */}
          TOP 5 MOST VIEWED
        </h1>
        <div className='TierList-box'>
          {
            singlePost.map((post)=>(
              <SideBarTierList post = {post} key={post.project_id}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default SideBar