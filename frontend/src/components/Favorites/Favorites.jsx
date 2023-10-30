import { useEffect, useState } from 'react'
import Post from '../Post/Post'
import './Favorites.css'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Favorites = () => {
  const { user } = useSelector((state)=> state.auth)
  const [favorite,setFavortie] = useState([])

  const FecthFavorite = async () =>{
    const res = await axios.get(`http://localhost:3000/api/Post/getfavorite/${user.student_id}`)
    setFavortie(res.data.data)
  }

  useEffect(()=>{
    FecthFavorite()
  },[])

  return (
    <div className='Container-Favorites'>
        <h1 className='h1-Favorites'><i class="IconFav fa-solid fa-heart"></i>Your Favorite Projects</h1>
        <div className='Post-Favorties'>
          {
            favorite.map(ap=>(              
              <Post post ={ap} key={ap.project_id}/>              
            ))
          }
        </div>
    </div>
  )
}

export default Favorites