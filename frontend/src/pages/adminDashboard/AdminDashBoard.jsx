import { Link } from 'react-router-dom'
import DashPost from '../../components/DashPost/DashPost'
import NavBarAdmin from '../../components/Navbar_admin/NavBarAdmin'
import './AdminDashBoard.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

const AdminDashBoard = () => {
  const [DashPosted,setDashPost] = useState([])
  // console.log(DashPost);

  // Post API
  const FecthDashPost = async () =>{
      const res = await axios.get('http://localhost:3000/api/Post/getpost');
      setDashPost(res.data.data);  
  }

  useEffect(()=>{
      FecthDashPost()
  },[])

  return (
    <div className='Container-AdminDashBoard'>
      <NavBarAdmin/>
      <div className='Box-AdminDashBoard'>
        {
          DashPosted.map((p)=>(
            p.project_status === 'Pending' && (
              <DashPost DashPost = {p} key={p.project_id}/>
            )
          ))
        }
      </div>
      <Link className='link LinkadminEditUser' to='/adminEditUser'>
        <i class="IconEdit-AdminDashBoard fa-regular fa-pen-to-square"></i>
        แก้ไขข้อมูลนักศึกษา
      </Link>
    </div>
  )
}

export default AdminDashBoard