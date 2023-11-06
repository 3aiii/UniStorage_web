import './Spage.css'
import {useLocation} from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import swal from 'sweetalert2'

const Spage = () => {
  const location = useLocation().pathname.split('/')[2]
  const [singlePost,setSinglPost] = useState('')
  const [formattedDate, setFormattedDate] = useState('')
  const [isFavorited, setIsFavorited] = useState(false); 
  const [Favorite,setFavorite] = useState([])
  const { user } = useSelector((state)=> state.auth)
  const PF = "http://localhost:3000/img/"
  
  // UPDATE PARAMETER
  const [Title,setTitle] = useState('')
  const [Abstract,setAbstract] = useState('')
  const [update, setUpdate] = useState(false)
  const [Category,setCategory] = useState(singlePost.category_id)
  const [project_img_file,setfile_img] = useState(null)
  const [project_pdf_file,setfile_pdf] = useState(null)

  // EDIT PARAMETER
  const [Image,setImage] = useState(null)
  const [filename,setFilename] = useState('No selected file')
  const [filenamePDF,setfilenamePDF] = useState('No selected file')
  
  // HANDLE UPDATE
  const HandleUpdate = async () =>{
    const formDataUpdate = new FormData();

    formDataUpdate.append('project_id', singlePost.project_id);
    formDataUpdate.append('project_name', Title || singlePost.project_name);
    formDataUpdate.append('project_abstract', Abstract || singlePost.project_abstract);
    formDataUpdate.append('category_id', Category || singlePost.category_id);
    formDataUpdate.append('project_img_file', project_img_file || singlePost.project_img_file);
    formDataUpdate.append('project_pdf_file', project_pdf_file || singlePost.project_pdf_file);

    try {
      await swal.fire({
        title: 'คุณต้องการอัปเดตข้อมูลหรือไม่!',
        text: 'กรุณาตรวจสอบข้อมูลอีกครั้งก่อนกดปุ่มตกลง',
        icon: 'question',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
        showCancelButton : true,
        preConfirm: async ()=>{
            try {
              await axios.put('http://localhost:3000/api/Post/update',formDataUpdate,{
                headers: {
                  'Content-Type': 'multipart/form-data',
              }})
              window.location.reload()

              await swal.fire({
              title: 'บันทึก Project เสร็จสิ้น',
              text: 'ทุกคนจะเห็น project ของคุณได้ก็ต่อเมื่ออาจารย์ที่ปรึกษา Approve ให้',
              icon: 'success',
              confirmButtonText: 'ตกลง',
              showCancelButton : false,
              timer: 1200
              })
            } catch (error) {
              console.error("Error:",error)
            }
        }});
    } catch (error) {
      console.error(error);
    }
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

  // FAVORITE USER 
  const userfavorite = async () => {
    const res = await axios.get(`http://localhost:3000/api/Post/getfavorite/${user.student_id}`)
    setFavorite(res.data.data)
  }
  
  useEffect(()=>{
    fecthSinglePost()
    userfavorite()
  },[location])
  
  return (
    <div className='container-Spage'>
      <div className='main-Spage'>
          <h1 className='h1-Spage'>
            {
              update ? <input 
                          autoFocus 
                          type='text' 
                          defaultValue={singlePost.project_name} 
                          className='input-h1-update' 
                          onChange={(e)=>setTitle(e.target.value)}/> : 
              (
                singlePost.project_name
              )
            }
          </h1>
          <div className='User-info'>
            <img
              src='/src/assets/User.png'
              alt='SpageInfo'
              className='img-Spage'
            />
            <h3 className='Username-h3'>{singlePost.student_username}</h3>
            <div className='line-Post'></div>
            <span className='Date-span'>{formattedDate}</span>
          </div>
          <div className='interactive-Spage'>
            <div className='interactive-view-cat'>
              {
                update ? (
                  <select 
                    className='input-category-update' 
                    defaultValue={singlePost.category_id}
                    onChange={(e)=> setCategory(e.target.value)}
                  >
                      <option value='1'>Network</option>
                      <option value='2'>Multimedia</option>
                      <option value='3'>Artificial Intelligence</option>
                  </select>
                ) : (
                  <div className='link Category-btn-Spage'>
                    {singlePost.category_name}
                  </div>

                )
              }
              <span className='span-view-Spost'>
                <i className="IconView fa-regular fa-eye"></i> 
                  {singlePost.project_viewer}
              </span>            
            </div>
            <div className='interactive-button'>
              {
                update ? (
                  <div className='pdf-div' onClick={()=> document.querySelector(".input-file-pdf-update").click()}>
                    <input 
                      type='file' 
                      className='input-file-pdf-update' 
                      hidden
                      onChange={({ target : {files}})=>{
                        console.log(files)
                        if (files){
                          // AUTH PDF
                          const allowedPDF = /(\.pdf)$/i
                          if(!allowedPDF.exec(files[0].name)){
                            setPdfError('*ไฟล์ผลงานต้องเป็นไฟล์นามสกุล .pdf เท่านั้น');
                          }else {
                            files[0] && setfilenamePDF(files[0].name)
                            setfile_pdf(files[0]);
                          }                        
                        }
                      }} 
                    />
                    <i class="IconPDF fa-regular fa-file-pdf"></i>
                    {
                      filenamePDF === '' ?  <p className='pdf-text'>โปรดเลือกไฟล์งาน</p> : (
                        <p className='pdf-text'>{filenamePDF}</p>
                      )
                    }
                  </div> ) :
                (
                  <div className='btn-download' onClick={handleDownload}>
                    Download PDF
                  </div>          
                )
              }                 
              {
                user.student_id === singlePost.student_id && (                
                  update ? (
                    <p></p>
                  ) : (
                    <div className='btn-update' onClick={()=> setUpdate(true)}>
                      <i class="IconUpdatePost fa-regular fa-pen-to-square"></i>
                    </div>
                  )           
                ) 
              }
              <button className='favorite-btn' onClick={favorite}>
                <i className="IconNoneFavorite fa-solid fa-heart" id='IconFav'></i>
              </button>
            </div>
          </div>
          <div className='Spage-info'>
            {
              update ? (
                  <div className='input-file-update' onClick={()=> document.querySelector(".input-img-update").click()}>
                    <input 
                      type='file' 
                      className='input-img-update' 
                      hidden
                      onChange={({ target : {files} })=>{
                        files[0] && setFilename(files[0].name)
                        if (files){
                          // AUTH IMG
                          const allowedImg = /(\.png|\.jpg|\.jpeg)$/i;

                          if (!allowedImg.exec(files[0].name)) {
                            setImgError('*รูปภาพต้องเป็นไฟล์นามสกุล .png, .jpg, หรือ .jpeg เท่านั้น');
                          } else {
                            setImage(URL.createObjectURL(files[0]))
                            setfile_img(files[0]);
                            // setImgError(''); // ล้างข้อความผิดพลาดหากรูปภาพถูกต้อง
                          }                        
                        }
                      }}                                             
                    /> 
                    {
                      Image ? <img 
                                src={Image}                       
                                alt={filename} 
                                className='UpdateImg'
                              /> : (
                        <div className='Text-Update'>
                          <i class="IconUpdateImg fa-solid fa-cloud-arrow-up"></i>
                          <p className='p-text-update'>โปรดเลือกรูปภาพ</p>
                        </div>
                      )
                    }                
                  </div>
                ): (
                <img
                  src={PF + singlePost.project_img_file}
                  alt='SpageInfo'
                  className='Spage-info-img'
                />
              )
            }        
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
            update && (
              <div className='box-btn-update'>
                <button className='btn-submit-back' onClick={()=> window.location.reload()}>Back</button> 
                <button className='btn-submit-update' onClick={HandleUpdate}>Update</button> 
              </div>
            )
          }
      </div>
    </div>
  )
}

export default Spage