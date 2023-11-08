import { useEffect, useState } from 'react';
import './CategoryPostMain.css'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CategoryPostMain = ({post}) => {
    const { user } = useSelector((state)=> state.auth)
    const keywords = ["Network", "Multimedia", "Artificial Intelligence"];
    const [isFavorited,setIsFavorited] = useState(false); 
    const [Favorite,setFavorite] = useState([])
    const PF = "http://localhost:3000/img/"
    
    const postDate = new Date(post.project_create);
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    const formattedDate = postDate.toLocaleDateString('en-US', options);
    let ToggleClassFavorite = Favorite.some(e => e.project_id === post.project_id) ? '-active' : ''
    
    // HANDLE VIWER  
    const HandleViewer = async() =>{
      await axios.put(`http://localhost:3000/api/Post/singlePage/${post.project_id}`)
    }
    
    // FAVORITE BUTTON
    const favorite = async () => {
      const isAlreadyFavorited = Favorite.some(item => item.student_id === post.student_id && item.project_id === post.project_id);
      if (isAlreadyFavorited){
        await axios.delete(`http://localhost:3000/api/Post/favorite_delete/${user.student_id}/${post.project_id}`)
      } else {
        await axios.post(`http://localhost:3000/api/Post/favorite`,{ student_id: user.student_id, project_id: post.project_id });
      }
      window.location.reload()
    }

      // FAVORITE USER 
    const userfavorite = async () => {
        const res = await axios.get(`http://localhost:3000/api/Post/getfavorite/${user.student_id}`)
        setFavorite(res.data.data)
    }

    useEffect(() => {
        userfavorite();
    },[]);
    return (
        <div className='Container-CategoryPostMain'>
            <div className='CategoryPostMain-Box'> 
                <img
                    src={PF + post.project_img_file}
                    alt='CategoryPostMain-img'
                    className='CategoryPostMain-img'
                />
            </div>
            <div className='CategoryPostMain-info-user'>
                <img
                    src='/src/assets/User.png'
                    className='Img-User-Post'
                />
                <h4 className='h3-Post'>{post.student_username}</h4>
                <div className='line-Post'></div>
                <p className='span-Post'>{formattedDate}</p>
            </div>
            <Link  to={`/singlePage/${post.project_id}`} onClick={HandleViewer} className='link CategoryPostMain-Topic'>
                <h2 className='CategoryPostMain-h2'>{post.project_name}</h2>
                <p className='CategoryPostMain-p'>{post.project_abstract}</p>
            </Link>
            <div className='CategoryPostMain-action'>
                <div className='CategoryPostMain-box-cat'>
                    <button className='Category-btn-Post'>{post.category_name}</button>
                    <p className='span-view-Post'>
                        <i className="IconView fa-regular fa-eye"></i>
                        {post.project_viewer}
                        </p>
                </div>
                <button 
                    className={`favorite-btn${ToggleClassFavorite}`}             
                    onClick={()=>{
                    favorite()
                    setIsFavorited(!isFavorited)
                    }}
                >
                    <i className="IconNoneFavorite fa-solid fa-heart" id='IconFav'></i>
                </button>        
            </div>
        </div>
    )
}

export default CategoryPostMain