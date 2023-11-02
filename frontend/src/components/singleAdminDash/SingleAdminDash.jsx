import './SingleAdminDash.css'
import {useLocation} from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert2'
const SingleAdminDash = () => {
  const location = useLocation().pathname.split('/')[2]
  const [singlePost,setSinglPost] = useState('')
  const [formattedDate, setFormattedDate] = useState('')

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

   // APPROVE API
   const HandleApprove = async () =>{
    const Dashboard_Data = {
        project_id : singlePost.project_id
    }
    
    await swal.fire({
        title: 'คุณต้องการเผยแผร่ผลงานนี้หรือไม่!',
        text: 'กรุณาตรวจสอบข้อมูลอีกครั้งก่อนกดปุ่มตกลง',
        icon: 'question',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
        showCancelButton: true,
        preConfirm: async () => {
          await axios.put('http://localhost:3000/api/Post/approve', Dashboard_Data);
          await swal.fire({
              title: 'ได้เผยแผร่ผลงานเรียบร้อย',
              icon: 'success',
              confirmButtonText: 'ตกลง',
              showCancelButton: false,
              timer: 1200
            });
            window.location.replace('/adminDash');
        }
    });
}

// REJECT API
const HandleReject = async () =>{
    const Dashboard_Data = {
        project_id : singlePost.project_id
    }
    await swal.fire({
        title: 'คุณต้องการให้แก้ผลงานนี้หรือไม่!',
        text: 'กรุณาตรวจสอบข้อมูลอีกครั้งก่อนกดปุ่มตกลง',
        icon: 'question',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
        showCancelButton: true,
        preConfirm: async () => {
            await axios.put('http://localhost:3000/api/Post/reject', Dashboard_Data);
            await swal.fire({
            title: 'ได้ปฏิเสธผลงานนี้เรียบร้อย',
            icon: 'success',
            confirmButtonText: 'ตกลง',
            showCancelButton: false,
            timer: 1200
            });
            window.location.replace('/adminDash');
    }
    });
  }
  
  useEffect(()=>{
    fecthSinglePost()
  },[])

  return (
    <div className='Container-SingleAdminDash'>
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
          <div className='interactive-view-cat-AdminDash'>
            <button className='link Category-btn-Spage'>
              {singlePost.category_name}
            </button>    
            <p className='interactive-p'>Email : {singlePost.student_email}</p>
          </div>
          <div className='interactive-button'>
            <div className='action-DashPost'>
              <button className='btn download-pdf' onClick={handleDownload}><i className="IconDashAdmin fa-solid fa-download"></i></button>
              <button className='btn approve' onClick={HandleApprove}><i className="IconDashAdmin fa-solid fa-check"></i></button>
              <button className='btn reject' onClick={HandleReject}><i className="IconDashAdmin fa-solid fa-xmark"></i></button>
            </div>
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

export default SingleAdminDash