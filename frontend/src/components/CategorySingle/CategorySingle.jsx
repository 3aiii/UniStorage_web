import CategoryPostMain from '../CategoryPostMain/CategoryPostMain'
import Post from '../Post/Post'
import './CategorySingle.css'
import SideBar from '../../components/SideBar/SideBar'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const CategorySingle = () => {
    const location = useLocation().pathname.split('/')[2]
    const [CatSingle,setCatSingle] = useState([])
    const [TrendCat,setTrendCat] = useState([])
    const ActivePost = CatSingle.filter(p=> p.project_status === 'Active')
    const keywords = ["Network", "Multimedia", "Artificial Intelligence"];

 
    const FecthPost_Category = async () =>{
        const res = await axios.get(`http://localhost:3000/api/Cat/CategoryPage/${location}`)
        setCatSingle(res.data.data)
    }
    
    const FecthTrend_Category = async () =>{
        const res = await axios.get(`http://localhost:3000/api/Cat/TrendCat/${location}`)
        setTrendCat(res.data.data)
    }

    useEffect(()=>{
        FecthPost_Category()
        FecthTrend_Category()
    },[location])
    
    return (
        <div className='Container-CategorySingle'>
            <div className='Categorysingle-info'>
                <ul className='CategorySingle-ul'>
                    <Link to={`/CategoryPage/1`} className='CategorySingle-li'>Network</Link>
                    <Link to={`/CategoryPage/2`} className='CategorySingle-li'>Multimedia</Link>
                    <Link to={`/CategoryPage/3`} className='CategorySingle-li'>Artificial Intelligence</Link>
                </ul>
                <h1 className='CategorySingle-h1'>Result for <span className='Span-topic'>{keywords[location - 1]}</span></h1>
                <p className='CategorySingle-count'>จำนวณผลงานทั้งหมด <span>{ActivePost.length}</span> ผลงาน</p>
            </div>
            <div className='Categorysingle-sub-info'>
                <p className='Categorysingle-Recommended'><i className="IconRocket fa-solid fa-rocket"></i>Recommended Network</p>
                <div className='Categorysingle-post'>
                    {
                        TrendCat.map((p)=>(
                            <CategoryPostMain post={p}/>
                        ))
                    }
                </div>
                <div className='Categorysingle-Main-post'>
                    <div className='Categorysingle-Blog'>
                        {
                            CatSingle.map((p)=>(
                                p.project_status ==='Active' && (
                                    <Post post= {p} key={p.project_id}/>
                                )
                            ))
                        }
                    </div>
                    <SideBar/>
                </div>
            </div>
        </div>
    )
}

export default CategorySingle