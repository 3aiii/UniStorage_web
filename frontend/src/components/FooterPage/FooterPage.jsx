import { Link } from 'react-router-dom'
import './FooterPage.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

const FooterPage = ({post}) => {
    const PF = "http://localhost:3000/img/"
    const [FormattedDate, setFormattedDate] = useState('');
    const [Favorite,setFavorite] = useState([])
    const { user } = useSelector((state)=> state.auth)

    // Date Config
    const postDate = new Date(post.project_create);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = postDate.toLocaleDateString('en-US', options);
    
    useEffect(() => {
      setFormattedDate(formattedDate);
    }, [formattedDate]);
    // console.log(FormattedDate);
    return (
        <div className='Container-FooterPage'>
            <div className='FooterPage-blog'>
                <div className='box-footerPage-img'>
                    <img
                        src= {PF + post.project_img_file}
                        alt='FooterPage-img'
                        className='FooterPage-img'
                    />
                </div>
                <div className='FooterPage-user'>
                    <img
                        src='/src/assets/User.png'
                        alt='FooterPage-user-img'
                        className='img-Spage'
                    />
                    <h3 className='Username-h3'>{post.student_username}</h3>
                    <div className='line-Post'></div>
                    <span className='Date-span'>{FormattedDate}</span>
                </div>
                <div className='footer-topic'>
                    <Link  to={`/singlePage/${post.project_id}`}  className='link CategoryPostMain-Topic'>
                        <h2 className='CategoryPostMain-h2'>{post.project_name}</h2>
                        <p className='CategoryPostMain-p'>{post.project_abstract}</p>
                    </Link>
                </div>
                <div className='CategoryPostMain-action-footer'>
                    <div className='Footer-box-cat'>
                        <Link to={`/CategoryPage/${post.category_id}`} className='link Category-btn-Spage' >
                            {post.category_name}
                        </Link>                        
                        <p className='span-view-Post'>
                            <i className="IconView fa-regular fa-eye"></i>
                            {post.project_viewer}
                        </p>
                    </div>
                </div>       
            </div>
        </div>
    )
}

export default FooterPage