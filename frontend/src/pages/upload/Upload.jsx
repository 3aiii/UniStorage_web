import './Upload.css'
import NavBar from '../../components/Navbar/NavBar'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

const Upload = () => {
    const [project_name,setName] = useState('')
    const [project_abstract,setAbs] = useState('')
    const [category_id,setCategory] = useState('')
    const [project_turnitin,setTurnitin] = useState(0)
    const [project_img_file,setfile_img] = useState(null)
    const [project_pdf_file,setfile_pdf] = useState(null)
    const user = 10
    // Auth PDF file
    const handleFileChange = (e) =>{
        const file = e.target.files[0]
        
        if(file){
            const allowedPDF = /(\.pdf)$/i

            if(!allowedPDF.exec(file.name)){
                e.target.value = ''
                return ;
            }
        setfile_pdf(e.target.files[0])
        }
    }
    
    // Auth Img file
    const handleImgChange = (e) =>{
        const file = e.target.files[0]
        // console.log(file);
        
        if(file){
            const allowedImg = /(\.png|jpg|jpeg)$/i

            if(!allowedImg.exec(file.name)){
                e.target.value = ''
                return ;
            }
        setfile_img(e.target.files[0])
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if(!category_id){
            // const fail_cat = document.getElementById('failText')
            // fail_cat.classList.replace('hide','active')
            pass
          } else{
                const data = new FormData()
                data.append('student_id',user)
                data.append('project_name',project_name)
                data.append('project_abstract',project_abstract)
                data.append('project_turnitin',project_turnitin)
                data.append('project_img_file',project_img_file)
                data.append('project_pdf_file',project_pdf_file)
                data.append('category_id',category_id)

                if(data){
                await Swal.fire({
                    title: 'คุณต้องการบันทึกหรือไม่!',
                    text: 'กรุณาตรวจสอบข้อมูลอีกครั้งก่อนกดปุ่มตกลง',
                    icon: 'question',
                    confirmButtonText: 'ตกลง',
                    cancelButtonText: 'ยกเลิก',
                    showCancelButton : true,
                    preConfirm: async ()=>{
                        try {
                            const res = await axios.post('http://localhost:3000/api/Post/create',data,{
                            headers : {
                                "Content-Type": "multipart/form-data",
                            }
                            })
                            await Swal.fire({
                            title: 'บันทึก Project เสร็จสิ้น',
                            text: 'ทุกคนจะเห็น project ของคุณได้ก็ต่อเมื่ออาจารย์ที่ปรึกษา Approve ให้',
                            icon: 'success',
                            confirmButtonText: 'ตกลง',
                            showCancelButton : false,
                            timer: 1200
                            })
                            window.location = ("/")
                        } catch (error) {
                            console.error("Error:",error)
                        }
                        }
                    });
                } else{
                    Swal.showValidationMessage('โปรดใส่ข้อมูลให้ครบถ้วน !')
                }
        }
    }

    return (
        <div className='Container-Upload'>
            <NavBar/>
            <div className='Box-Main-Upload'>
                <h1 className='h1-Upload'>Upload</h1>
                <div className='Border-Main-Upload'>
                    <form className='input-Main-Upload' encType='multipart/form-data' onSubmit={handleSubmit}>
                        <label className='lb projectname'>ชื่อผลงาน</label>
                        <input
                            type='text'
                            className='inputmain projectname'
                            onChange={(e)=> setName(e.target.value)}
                            required
                        />
                        <label className='lb Abstract'>บทคัดย่อ</label>
                        <textarea type='text'
                            onChange={(e)=> setAbs(e.target.value)}
                            className='inputmain Abstract'>
                        </textarea>
                        <div className='input-sub-upload'>
                            <div className='lbsub 1'>
                                <label className='lb-img'>รูปภาพประกอบ</label>
                                <input
                                    onChange={handleImgChange}                               
                                    type='file'
                                    className='inputsub img'
                                />
                            </div>
                            <div className='lbsub 2'>
                                <label className='lb-pdf'>ไฟล์ผลงาน</label>
                                <input
                                    type='file'
                                    className='inputsub pdf'
                                    onChange={handleFileChange}                               
                                />
                            </div>
                            <div className='lbsub 3'>
                                <label className='lb-turnitin'>ผล turnitin</label>
                                <input
                                    type='number'
                                    className='inputsub turnitin'
                                    onChange={(e)=> setTurnitin(e.target.value)}
                                    min={0}
                                    max={100}
                                    placeholder='ข้อมูล turnitin 0 - 100'
                                />
                                <p className='lb-p'><span>*หมายเหตุ</span> : เรียนรู้เพิ่มเติมเกี่ยวกับ turnitin เพิ่มเติมได้ <a className='link LearningHere' target='blank' href='https://w1.med.cmu.ac.th/library/files/Manual_Turnitin-for-Student.pdf'>ที่นี่</a></p>
                            </div>
                        </div>
                        <div className='input-sub-cat-submit'>
                            <div className='input-options'>
                                <label className='lb-cat'>หมวดหมู่</label>
                                <div className='box-select'>
                                    {/* {console.log(category_id)} */}
                                    <select value={category_id} className='inputsub cat' placeholder='Select your category please' onChange={(e)=> setCategory(e.target.value)}>
                                        <option value='0'>กรุณาเลือก</option>
                                        <option value='1'>Network</option>
                                        <option value='2'>Multimedia</option>
                                        <option value='3'>Artificial Intelligence</option>
                                    </select>
                                    <i className="IconArrow fa-solid fa-chevron-down"></i>
                                </div>
                            </div>
                            <button className='btn-submit' type='submit'>Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Upload