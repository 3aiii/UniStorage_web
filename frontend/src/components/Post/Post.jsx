import { useSelector } from 'react-redux'
import './Post.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Post = ({post}) => {
  const PF = "http://localhost:3000/img/"
  const { user } = useSelector((state)=> state.auth)

  
  const keywords = ["Network", "Multimedia", "Artificial Intelligence"];
  const [isFavorited,setIsFavorited] = useState(false); 
  const [Favorite,setFavorite] = useState([])
  
  const postDate = new Date(post.project_create);
  const options = { year: 'numeric', month: 'long', day: 'numeric'};
  const formattedDate = postDate.toLocaleDateString('en-US', options);
  
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
  
  // const currentDate = new Date();
  // const timeDifference = currentDate - postDate;
  // const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
  // FAVORITE USER 
  const userfavorite = async () => {
    const res = await axios.get(`http://localhost:3000/api/Post/getfavorite/${user.student_id}`)
    setFavorite(res.data.data)
  }
  
  let ToggleClassFavorite = Favorite.some(e => e.project_id === post.project_id) ? '-active' : ''
  
  useEffect(() => {
    userfavorite();
  },[]);

  return (
    <div className='Container-Post' key={post.project_id}>
      <div className='Main-Box-Post'>
        <div className='User-Date-Post'>
          <img
            src='/src/assets/User.png'
            alt='Img-User-Post'
            className='Img-User-Post'
          />
          <h3 className='h3-Post'>
            {post.student_username} 
          </h3>
          <div className='line-Post'></div>
          <span className='span-Post'>
            {formattedDate}
          </span>
          {/* {
            daysPassed <= 1 ? (
              <div className='New-Post'>
                <i class="IconNewPost fa-solid fa-star"></i>
                New Post
              </div>
            ) : (
              <div></div>
            )
          } */}
        </div>
        <div className='Info-Post'>
          <div className='Info-H1AndP'>
            <Link className='link h1-Post' to={`/singlePage/${post.project_id}`} onClick={HandleViewer}>
              {post.project_name}
              <p className='p-Post'>
                {
                  post.project_abstract
                }
              </p>
            </Link>
          </div>
          <img
            src= {PF + post.project_img_file}
            alt='Img-Cover-Post'
            className='Img-Cover-Post'
          />
        </div>
        <div className='Viewed-Post'>
          <div className='Viewed-btnAndView-Post'>
            <Link to={`/CategoryPage/${post.category_id}`} className='link Category-btn-Post'>
              { 
                keywords[post.category_id - 1]
              }
            </Link>
            <span className='span-view-Post'>
              <i className="IconView fa-regular fa-eye"></i> 
              {post.project_viewer}
            </span>
          </div>
          <button 
            className={`favorite-btn${ToggleClassFavorite}`}             
            onClick={()=>{
              favorite()
            }}
          >
            <i className="IconNoneFavorite fa-solid fa-heart" id='IconFav'></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Post