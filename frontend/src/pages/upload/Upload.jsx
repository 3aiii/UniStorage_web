import './Upload.css'
import NavBar from '../../components/Navbar/NavBar'
import { useState } from 'react'
import swal from 'sweetalert2'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Upload = () => {
    const [project_name,setName] = useState('')
    const [project_abstract,setAbs] = useState('')
    const [category_id,setCategory] = useState('')
    const [project_turnitin,setTurnitin] = useState(0)
    const [project_img_file,setfile_img] = useState(null)
    const [project_pdf_file,setfile_pdf] = useState(null)
    const { user } = useSelector((state)=> state.auth)

    // Auth PDF file
    const handleFileChange = (e) =>{
        const file = e.target.files[0]
        
        if(file){
            const allowedPDF = /(\.pdf)$/i

            if(!allowedPDF.exec(file.name)){
                e.target.value = ''
                setPdfError('*ไฟล์ผลงานต้องเป็นไฟล์นามสกุล .pdf เท่านั้น');
            }else {
                setfile_pdf(e.target.files[0]);
                setPdfError(''); // ล้างข้อความผิดพลาดหากไฟล์ผลงานถูกต้อง
            }
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
                setImgError('*รูปภาพต้องเป็นไฟล์นามสกุล .png, .jpg, หรือ .jpeg เท่านั้น');  
            }else{
                setfile_img(e.target.files[0]);
                setImgError(''); // ล้างข้อความผิดพลาดหากรูปภาพถูกต้อง
            }
        }
    }

    let [projectNameError, setProjectNameError] = useState('');
    let [abstractError, setAbstractError] = useState('');
    let [imgError, setImgError] = useState('');
    let [pdfError, setPdfError] = useState('');
    let [turnitinError, setTurnitinError] = useState('');
    let [categoryError, setCategoryError] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if (!project_name || !project_abstract || !category_id || !project_turnitin || !project_img_file || !project_pdf_file) {
            setProjectNameError(!project_name ? '*กรุณากรอกชื่อผลงาน' : '');
            setAbstractError(!project_abstract ? '*กรุณากรอกบทคัดย่อ' : '');
            setImgError(!project_img_file ? '*กรุณาอัปโหลดรูปภาพประกอบ' : '');
            setTurnitinError(!project_turnitin ? '*กรุณากรอกผล Turnitin' : '')
            setPdfError(!project_pdf_file ? '*กรุณาอัปโหลดไฟล์ผลงาน' : '');
            setCategoryError(!category_id ? '*กรุณาเลือกหมวดหมู่' : '');
        } else{
            const data = new FormData()
            data.append('student_id',user.student_id)
            data.append('project_name',project_name)
            data.append('project_abstract',project_abstract)
            data.append('project_turnitin',project_turnitin)
            data.append('project_img_file',project_img_file)
            data.append('project_pdf_file',project_pdf_file)
            data.append('category_id',category_id)
    
            if(data){
                await swal.fire({
                title: 'คุณต้องการบันทึกหรือไม่!',
                text: 'กรุณาตรวจสอบข้อมูลอีกครั้งก่อนกดปุ่มตกลง',
                icon: 'question',
                confirmButtonText: 'ตกลง',
                cancelButtonText: 'ยกเลิก',
                showCancelButton : true,
                preConfirm: async ()=>{
                    try {
                        await axios.post('http://localhost:3000/api/Post/create',data,{
                            headers : {
                                "Content-Type": "multipart/form-data",
                            }
                        })
                        await swal.fire({
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
                }});
            } else{
                swal.showValidationMessage('โปรดใส่ข้อมูลให้ครบถ้วน !')
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
                            onChange={(e)=> {
                                setName(e.target.value);
                                setProjectNameError('');
                            }}                    
                        />
                        {projectNameError && <div className='error-message'>{projectNameError}</div>}                        
                        <label className='lb Abstract'>บทคัดย่อ</label>
                        <textarea type='text'
                            onChange={(e)=> {
                                setAbs(e.target.value);
                                setAbstractError('');
                            }}
                            className='inputmain Abstract'>
                        </textarea>
                        {abstractError && <div className='error-message'>{abstractError}</div>}

                        <div className='input-sub-upload'>
                            <div className='lbsub 1'>
                                <label className='lb-img'>รูปภาพประกอบ</label>
                                <input
                                    onChange={handleImgChange}                               
                                    type='file'
                                    className='inputsub img'
                                />
                                {imgError && <div className='error-message'>{imgError}</div>}                                
                            </div>
                            <div className='lbsub 2'>
                                <label className='lb-pdf'>ไฟล์ผลงาน</label>
                                <input
                                    type='file'
                                    className='inputsub pdf'
                                    onChange={handleFileChange}                               
                                />
                                {pdfError && <div className='error-message'>{pdfError}</div>}                            
                            </div>
                            <div className='lbsub 3'>
                                <label className='lb-turnitin'>ผล turnitin</label>
                                <input
                                    type='number'
                                    className='inputsub turnitin'
                                    onChange={(e)=> {
                                        const inputValue = e.target.value;
                                        
                                        if(inputValue === ''){
                                            setTurnitinError('*กรุณากรอกผล Turnitin')
                                        }

                                        if (inputValue >= 0 && inputValue <= 100) {
                                            setTurnitin(inputValue)
                                            // setTurnitinError('')
                                        } else {
                                            setTurnitinError('*ค่า turnitin ต้องอยู่ในช่วง 0 - 100')
                                        }
                                        
                                    }}          
                                    placeholder='ข้อมูล turnitin 0 - 100'
                                />
                                { 
                                    turnitinError === '' ? (
                                        <p className='lb-p'><span>*หมายเหตุ</span> : เรียนรู้เพิ่มเติมเกี่ยวกับ turnitin เพิ่มเติมได้
                                            <a className='link LearningHere' target='blank' href='https://w1.med.cmu.ac.th/library/files/Manual_Turnitin-for-Student.pdf'>ที่นี่</a>
                                        </p>
                                    ) : (                                    
                                        turnitinError && <div className='error-message'>{turnitinError}</div>
                                    )
                                }
                            </div>
                        </div>
                        <div className='input-sub-cat-submit'>
                            <div className='input-options'>
                                <label className='lb-cat'>หมวดหมู่</label>
                                <div className='box-select'>
                                    <select value={category_id} 
                                        className='inputsub cat' 
                                        placeholder='Select your category please' 
                                        onChange={(e)=> {
                                            setCategory(e.target.value);
                                            setCategoryError('');
                                        }}>
                                        
                                        <option value=''>กรุณาเลือก</option>
                                        <option value='1'>Network</option>
                                        <option value='2'>Multimedia</option>
                                        <option value='3'>Artificial Intelligence</option>
                                    </select>
                                    <i className="IconArrow fa-solid fa-chevron-down"></i>
                                </div>
                                {categoryError && <div className='error-message'>{categoryError}</div>}
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