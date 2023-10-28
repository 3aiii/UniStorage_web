import './Spage.css'
import {useLocation} from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'

const Spage = () => {
  const location = useLocation().pathname.split('/')[2]
  const [singlePost,setSinglPost] = useState('')
  const [formattedDate, setFormattedDate] = useState('')

  const fecthSinglePost = async () =>{
    const res = await axios.get(`http://localhost:3000/api/Post/${location}`)
    setSinglPost(res.data.data[0])

    // Date Config
    const postDate = new Date(res.data.data[0].project_create);
    const formatter = new Intl.DateTimeFormat('th-TH', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    const formatted = formatter.format(postDate);
    setFormattedDate(formatted);

  }
  
  useEffect(()=>{
    fecthSinglePost()
  },[])
  
  return (
    <div className='container-Spage'>
      <div className='main-Spage'>
        <h1 className='h1-Spage'>
          {singlePost.project_name}
        </h1>
        <div className='User-info'>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_s-qTS_S74BAdcj1XFstXdMSkfWdCxCV40A&usqp=CAU'
            alt='SpageInfo'
            className='img-Spage'
          />
          <h3 className='Username-h3'>{singlePost.student_username}</h3>
          <div className='line-Post'></div>
          <span className='Date-span'>{formattedDate}</span>
        </div>
        <div className='interactive-Spage'>
          <div className='interactive-view-cat'>
            <button className='link Category-btn-Spage'>
              {singlePost.category_name}
            </button>
            <span className='span-view-Spost'>
              <i className="IconView fa-regular fa-eye"></i> 
                {singlePost.project_viewer}
            </span>            
          </div>
          <div className='interactive-button'>
            <button className='btn-download'>
              Download PDF
            </button>          
            <button className='favorite-btn'>
              <i className="IconNoneFavorite fa-solid fa-heart" id='IconFav'></i>
            </button>
          </div>
        </div>
        <div className='Spage-info'>
          <img
            src='https://images6.fanpop.com/image/photos/43100000/Ryujin-ryujin-itzy-43197437-300-300.png'
            alt='SpageInfo'
            className='Spage-info-img'
          />
          <div className='Spage-main-info'>
            <h4 className='Spage-h4'>บทคัดย่อ</h4>
            <p className='Spage-p'>
              {singlePost.project_abstract}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Spage