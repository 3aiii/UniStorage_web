import './Spage.css'
import {Link} from 'react-router-dom'

const Spage = () => {
  return (
    <div className='container-Spage'>
      <div className='main-Spage'>
        <h1 className='h1-Spage'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, </h1>
        <div className='User-info'>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_s-qTS_S74BAdcj1XFstXdMSkfWdCxCV40A&usqp=CAU'
            alt='SpageInfo'
            className='img-Spage'
          />
          <h3 className='Username-h3'>Username</h3>
          <div className='line-Post'></div>
          <span className='Date-span'>2023-09-27 08:54:07</span>
        </div>
        <div className='interactive-Spage'>
          <div className='interactive-view-cat'>
            <Link to={'/home'} className='link Category-btn-Spage'>
              Network
            </Link>
            <span className='span-view-Spost'>
              <i className="IconView fa-regular fa-eye"></i> 
                512 view
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
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
              The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Spage