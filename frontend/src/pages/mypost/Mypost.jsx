import axios from 'axios'
import NavBar from '../../components/Navbar/NavBar'
import Post from '../../components/Post/Post'
import './Mypost.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import SideBar from '../../components/SideBar/SideBar'

const Mypost = () => {
    const { user } = useSelector((state)=> state.auth)
    const [Mypost,setMypost] = useState([])

    // FECTH YOUR POST
    const fecthMyPost = async () =>{
        const res = await axios.get(`http://localhost:3000/api/Post/mypost/${user.student_id}`)
        setMypost(res.data.data)
    } 

    useEffect(()=>{
        fecthMyPost()
    },[])

    return (
    <div className='Container-Mypost'>
        <NavBar/>
        <div className='Box-Mypost'>
            <div className='flex-Mypost'>
                <h1 className='h1-Mypost'><i className="IconPaper fa-regular fa-newspaper"></i> Result for <span className='span-Mypost'> Your Post</span></h1>
                <div className='Myposts'>
                    {
                        Mypost.map((p)=>(
                            <Post post={p} key={p.project_id}/>
                        ))
                    }
                </div>
            </div>
            <SideBar/>
        </div>
    </div>
    )
}

export default Mypost