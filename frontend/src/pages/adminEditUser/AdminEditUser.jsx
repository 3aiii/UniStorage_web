import DashEditUserPost from '../../components/DashEditUserPost/DashEditUserPost'
import NavBarAdmin from '../../components/Navbar_admin/NavBarAdmin'
import './AdminEditUser.css'
import axios from "axios"
import { useEffect, useState } from 'react'

const AdminEditUser = () => {
    const [user,setUser] = useState([])
    const [search,setSearch] = useState('')

    const FetchUser = async () =>{
        let url = `http://localhost:3000/api/User/getuser`

        if(search){
            url += `?search=${search}`
        }

        try {
            const res = await axios.get(url)
            console.log(url);
            setUser(res.data.data)            
        } catch (error) {
            console.error("Error fetching user data:", error);  
        }
    }    

    // const FetchAllUser = async () =>{
    //     try {
    //         const res = await axios.get(`http://localhost:3000/api/User/getuser`)
    //         // console.log(res.data.data);
    //         setUser(res.data.data)
            
    //     } catch (error) {
    //         console.error("Error fetching user data:", error);
    //     }
    // }

    const onSearch = (e) =>{
        e.preventDefault()
        FetchUser()
    }

    useEffect(()=>{
        FetchUser()
    },[])

    return (
        <div className='container-AdminEditUser'>
            <NavBarAdmin/>
            <div className='Main-AdminEditUser'>
                <div className='Search-AdminEditUser'>
                    <form onSubmit={onSearch}>
                        <i className="IconSearch fa-solid fa-magnifying-glass"></i>
                        <input
                            type='text'
                            className='search-AdminEditUser'
                            placeholder='Search'
                            value={search}
                            onChange={(e)=> setSearch(e.target.value)}
                        />
                        {/* <button type='submit'>dwdw</button> */}
                    </form>
                </div>
                <div className='info-AdminEditUser'>
                    {
                        user.map((u)=>(
                            <DashEditUserPost deup = {u}  key={u.student_id}/>
                        ))
                    }
                </div>
            </div>
                
        </div>
    )
}

export default AdminEditUser