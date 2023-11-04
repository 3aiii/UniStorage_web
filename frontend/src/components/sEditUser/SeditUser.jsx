import { Link, useLocation } from 'react-router-dom'
import './SeditUser.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert2'

const SeditUser = () => {
    const location = useLocation().pathname.split('/')[2]
    const [student_id,setStudent_id] = useState('')
    const [student_username, setStudent_username] = useState('');
    const [student_password, setStudent_password] = useState('');
    const [student_fname, setStudent_fname] = useState('');
    const [student_lname, setStudent_lname] = useState('');
    const [student_email, setStudent_email] = useState('');

    // FETCH SINGLE USER 
    const FetchSingleUser = async () =>{
        const res = await axios.get(`http://localhost:3000/api/User/${location}`)
        setStudent_id(res.data.data[0].student_id);
        setStudent_username(res.data.data[0].student_username);
        setStudent_password(res.data.data[0].student_password);
        setStudent_fname(res.data.data[0].student_fname);
        setStudent_lname(res.data.data[0].student_lname);
        setStudent_email(res.data.data[0].student_email);
    }

    // HANDLE SUBMIT
    const HandleSubmit = async (e) =>{
        e.preventDefault()    

        const Edit_Data = {
            student_id,
            student_username,
            student_password,
            student_fname,
            student_lname,
            student_email
        }

        swal.fire({
            title: 'คุณต้องการบันทึกการเปลี่ยนแปลงหรือไม่!',
            text: 'กรุณาตรวจสอบข้อมูลอีกครั้งก่อนกดปุ่มตกลง',
            icon: 'question',
            confirmButtonText: 'ตกลง',  
            cancelButtonText: 'ยกเลิก',
            showCancelButton : true,
            preConfirm: async ()=>{
                try {
                    await axios.put('http://localhost:3000/api/User/update',Edit_Data)

                    await swal.fire({
                    title: 'บันทึกการเปลี่ยนแปลงเสร็จสิ้น',
                    // text: 'ทุกคนจะเห็น project ของคุณได้ก็ต่อเมื่ออาจารย์ที่ปรึกษา Approve ให้',
                    icon: 'success',
                    confirmButtonText: 'ตกลง',
                    showCancelButton : false,
                    timer: 1200
                    })
                    window.location = ("/adminEditUser")
                } catch (error) {
                    swal.showValidationMessage('โปรดใส่ข้อมูลให้ครบถ้วน !')
                    console.error("Error:",error)
                }
                }
            }
        );
    }

    useEffect(()=>{
        FetchSingleUser()
    },[])

    return (
        <div className='Container-SeditUser'>
            <div className='Main-SeditUser'>
                <h1 className='h1-SeditUser'>แก้ไขข้อมูลนักศึกษา <span className='span-DashEditUser'></span></h1>
                <form className='form-edit-SeditUser' onSubmit={HandleSubmit}>
                    <div className='EditInfo-SeditUser'>
                        <div className='double-container'>
                            <label className='lb-SeditUser'>Username</label>
                            <input
                                className='ip Username'
                                type='text'
                                defaultValue={student_username}
                                onChange={(e)=> setStudent_username(e.target.value)}
                            />
                            <label className='lb-SeditUser'>FirstName</label>
                            <input
                                className='ip FirstName'
                                type='text'
                                defaultValue={student_fname}
                                onChange={(e)=> setStudent_fname(e.target.value)}
                            />
                        </div>
                        <div className='double-container'>                        
                            <label className='lb-SeditUser'>Password</label>
                            <input
                                className='ip Password'
                                type='text'
                                placeholder='New Password'
                                onChange={(e)=> setStudent_password(e.target.value)}
                            />                
                            <label className='lb-SeditUser'>LastName</label>
                            <input
                                className='ip LastName'
                                type='text'
                                defaultValue={student_lname}
                                onChange={(e)=> setStudent_lname(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='single-container'>
                        <label className='lb-SeditUser email'>Email</label>
                        <input
                            className='ip email'
                            type='text'
                            defaultValue={student_email}
                            onChange={(e)=> setStudent_email(e.target.value)}
                        />                
                    </div>
                    <div className='btn-container'>
                        <button className='btnSeditUser cancel' type='reset' onClick={()=> window.history.back()}>ยกเลิก</button>
                        <button className='btnSeditUser submit' type='submit'>บันทึก</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SeditUser