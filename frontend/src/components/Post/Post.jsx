import './Post.css'
import {Link} from 'react-router-dom'

const Post = ({post}) => {
  const PF = "http://localhost:3000/img/"

  // Date Config
  const postDate = new Date(post.project_create);
  const formatter = new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedDate = formatter.format(postDate);

  return (
    <div className='Container-Post' key={post.project_id}>
      <div className='Main-Box-Post'>
        <div className='User-Date-Post'>
          <img
            src='https://www.jollyboxdesign.com/wp-content/uploads/2021/08/Administrator.png'
            alt='Img-User-Post'
            className='Img-User-Post'
          />
          <h3 className='h3-Post'>
            {post.student_username} 
          </h3>
          <div className='line-Post'></div>
          <span className='span-Post'>
            {/* {new Date(post.project_create).toDateString()} */}
            {formattedDate}
          </span>
        </div>
        <div className='Info-Post'>
          <div className='Info-H1AndP'>
            <Link className='link h1-Post' to={`/singlePage/${post.project_id}`}>
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
            <Link to={'/'} className='link Category-btn-Post'>
              {post.category_name}
            </Link>
            <span className='span-view-Post'>
              <i className="IconView fa-regular fa-eye"></i> 
              {post.project_viewer}
            </span>
          </div>
          <button className='favorite-btn'>
            <i className="IconNoneFavorite fa-solid fa-heart" id='IconFav'></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Post