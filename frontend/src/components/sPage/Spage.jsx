import './Spage.css'
import {useLocation} from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Spage = () => {
  const location = useLocation().pathname.split('/')[2]
  const [singlePost,setSinglPost] = useState('')
  const [formattedDate, setFormattedDate] = useState('')
  const [isFavorited, setIsFavorited] = useState(false); 
  const [Favorite,setFavorite] = useState([])
  
  // UPDATE PARAMETER
  const [Title,setTitle] = useState('')
  const [Abstract,setAbstract] = useState('')
  const [update, setUpdate] = useState(false)

  const { user } = useSelector((state)=> state.auth)
  const PF = "http://localhost:3000/img/"

  // HANDLE UPDATE
  const HandleUpdate = async () =>{
    await axios.put('http://localhost:3000/api/Post/update',{
      project_id : singlePost.project_id,
      project_name : Title || singlePost.project_name,
      project_abstract : Abstract || singlePost.project_abstract
    })

    window.location.reload()
  }

  // HANDLE DOWNLOAD PDF
  const handleDownload  = async () =>{
    
    await axios.get(`http://localhost:3000/api/Post/PDF/${location}`,{
      responseType : 'blob'
    })
    .then((res)=>{
      const blob = new Blob([res.data],{type : 'application/pdf'})

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${singlePost.project_pdf_file}`
      link.click()
      URL.revokeObjectURL(url)
    }).catch((err)=>{
      console.log(err);
    })
  }

  // FECTH SINGLE POST
  const fecthSinglePost = async () =>{
    const res = await axios.get(`http://localhost:3000/api/Post/${location}`)
    setSinglPost(res.data.data[0])

    // Date Config
    const postDate = new Date(res.data.data[0].project_create);
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    const formattedDate = postDate.toLocaleDateString('en-US', options);
    setFormattedDate(formattedDate);
  }

  // FAVORITE BUTTON
  const favorite = async () => {
    const isAlreadyFavorited = Favorite.some(item => item.student_id === singlePost.student_id && item.project_id === singlePost.project_id);
    
    if (isAlreadyFavorited){
      await axios.delete(`http://localhost:3000/api/Post/favorite_delete/${user.student_id}/${singlePost.project_id}`)
    } else {
      await axios.post(`http://localhost:3000/api/Post/favorite`,{ student_id: user.student_id, project_id: singlePost.project_id });
    }

    setIsFavorited(isAlreadyFavorited)
    window.location.reload()
  }
  
  useEffect(()=>{
    fecthSinglePost()
  },[location])
  
  return (
    <div className='container-Spage'>
      <div className='main-Spage'>
        <h1 className='h1-Spage'>
          {
            update ? <input autoFocus type='text' defaultValue={singlePost.project_name} className='input-h1-update' onChange={(e)=>setTitle(e.target.value)}/> : (
              singlePost.project_name
            )
          }
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
            <button className='btn-download' onClick={handleDownload}>
              Download PDF
            </button>          
            <button className='favorite-btn' onClick={favorite}>
              <i className="IconNoneFavorite fa-solid fa-heart" id='IconFav'></i>
            </button>
            {
              user.student_id === singlePost.student_id && (
                <div className='btn-update' onClick={()=> setUpdate(true)}>
                  <i class="IconUpdatePost fa-solid fa-pen-to-square"></i>
                </div>
              ) 
            }
          </div>
        </div>
        <div className='Spage-info'>
          <img
            src={PF + singlePost.project_img_file}
            alt='SpageInfo'
            className='Spage-info-img'
          />
          <div className='Spage-main-info'>
            <h4 className='Spage-h4'>บทคัดย่อ</h4>
            <p className='Spage-p'>
              {
                update ? <textarea defaultValue={singlePost.project_abstract} className='input-p-update' onChange={(e)=>setAbstract(e.target.value)}/> : (
                  singlePost.project_abstract
                )
              }
            </p>
          </div>
        </div>
        {
          update && <button className='btn-submit-update' onClick={HandleUpdate}>Update</button> 
        }
      </div>
    </div>
  )
}

export default Spage