import './Post.css'
import {Link} from 'react-router-dom'


const Post = () => {

  // const handleFav = () =>{
  //   const ToggleFav = document.getElementsByClassName('favorite-btn')
    
  //   Togg
  // }

  // console.log(ToggleFav);  
  return (
    <div className='Container-Post'>
        <div className='Main-Box-Post'>
          <div className='User-Date-Post'>
            <img
              src='https://www.jollyboxdesign.com/wp-content/uploads/2021/08/Administrator.png'
              alt='Img-User-Post'
              className='Img-User-Post'
            />
            <h3 className='h3-Post'>
              Username
            </h3>
            <div className='line-Post'></div>
            <span className='span-Post'>
              2023-09-27 08:54:07
            </span>
          </div>
          <div className='Info-Post'>
            <div className='Info-H1AndP'>
              <Link className='link h1-Post' to={'/singlePage/1'}>
                Lorem Ipsum is simply dummy text of dummy text ever since the 1500s, when an unknown printer
                <p className='p-Post'>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it 
                </p>
              </Link>
            </div>
            <img
              src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/album-cover%2Ccover-design-template-6269b808c622fea9eb7dad717e8cc3a0_screen.jpg?ts=1593443173'
              alt='Img-Cover-Post'
              className='Img-Cover-Post'
            />
          </div>
          <div className='Viewed-Post'>
            <div className='Viewed-btnAndView-Post'>
              <Link to={'/home'} className='link Category-btn-Post'>
                Network
              </Link>
              <span className='span-view-Post'>
                <i className="IconView fa-regular fa-eye"></i> 
                512 view
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