import { Link, useLocation } from 'react-router-dom'
import './SeditUser.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert2'

const SeditUser = () => {
    const location = useLocation().pathname.split('/')[2]
    const [AllData ,setAllData] = useState('')
    const [student_username, setStudent_username] = useState('');
    const [student_password, setStudent_password] = useState('');
    const [student_fname, setStudent_fname] = useState('');
    const [student_lname, setStudent_lname] = useState('');
    const [student_email, setStudent_email] = useState('');

    //สร้างตัวแปรสำหรับเก็บข้อความที่ต้องการแสดงเมื่อข้อมูลไม่ถูกต้องสำหรับแต่ละ Input
    const [fnameError, setFirstNameError] = useState('');
    const [lnameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // FETCH SINGLE USER 
    const FetchSingleUser = async () =>{
        const res = await axios.get(`http://localhost:3000/api/User/${location}`)
        setAllData(res.data.data[0])
    }

    // HANDLE SUBMIT
    const HandleSubmit = async (e) =>{
        e.preventDefault()  

        if (!student_fname || !student_lname || !student_email || !student_username || !student_password) {
            setFirstNameError(!student_fname ? '*กรุณากรอกชื่อของคุณ' : '')
            setLastNameError(!student_lname ? '*กรุณากรอกนามสกุลของคุณ' : '')
            setEmailError(!student_email ? '*กรุณากรอกอีเมล' : '')
            setUsernameError(!student_username ? '*กรุณากรอกชื่อผู้ใช้ของคุณ' : '')
            setPasswordError(!student_password ? '*กรุณากรอกรหัสผ่าน' : '')
          } else{
                const Edit_Data = {
                    student_id : AllData.student_id,
                    student_username,
                    student_password,
                    student_fname ,
                    student_lname ,
                    student_email
                }
                console.log(Edit_Data);

                try {
                    swal.fire({
                        title: 'คุณต้องการบันทึกการเปลี่ยนแปลงหรือไม่!',
                        text: 'กรุณาตรวจสอบข้อมูลอีกครั้งก่อนกดปุ่มตกลง',
                        icon: 'question',
                        confirmButtonText: 'ตกลง',  
                        cancelButtonText: 'ยกเลิก',
                        showCancelButton : true,
                        preConfirm: async ()=>{
                                await axios.put('http://localhost:3000/api/User/update',Edit_Data)
            
                                swal.fire({
                                title: 'บันทึกการเปลี่ยนแปลงเสร็จสิ้น',
                                // text: 'ทุกคนจะเห็น project ของคุณได้ก็ต่อเมื่ออาจารย์ที่ปรึกษา Approve ให้',
                                icon: 'success',
                                confirmButtonText: 'ตกลง',
                                showCancelButton : false,
                                timer: 1200
                                })
                                window.location = ("/adminEditUser")
                            }
                        }
                    );                    
                } catch (error) {
                    console.log(`Got some error = ${error}`);
                }
            }
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
                                placeholder={AllData.student_username}
                                onChange={(e)=> {
                                    setStudent_username(e.target.value) 
                                    setUsernameError('');
                                }}
                            />
                            {usernameError && <div className='error-message'>{usernameError}</div>}

                            <label className='lb-SeditUser'>FirstName</label>
                            <input
                                className='ip FirstName'
                                type='text'
                                placeholder={AllData.student_fname}
                                onChange={(e)=>{
                                    setStudent_fname(e.target.value)
                                    setFirstNameError('')
                                }}
                            />
                            {fnameError && <div className='error-message'>{fnameError}</div>}     
                        </div>
                        <div className='double-container'>                        
                            <label className='lb-SeditUser'>Password</label>
                            <input
                                className='ip Password'
                                type='text'
                                placeholder='New Password'
                                onChange={(e)=>{
                                    setStudent_password(e.target.value)
                                    setPasswordError('')
                                }}
                            />                
                            {passwordError && <div className='error-message'>{passwordError}</div>}
                            <label className='lb-SeditUser'>LastName</label>
                            <input
                                className='ip LastName'
                                type='text'
                                placeholder={AllData.student_lname}
                                onChange={(e)=>{
                                    setStudent_lname(e.target.value)
                                    setLastNameError('')
                                }}
                            />
                            {lnameError && <div className='error-message'>{lnameError}</div>}
                        </div>
                    </div>
                    <div className='single-container'>
                        <label className='lb-SeditUser email'>Email</label>
                        <input
                            className='ip email'
                            type='text'
                            placeholder={AllData.student_email}
                            onChange={(e)=> {
                                setStudent_email(e.target.value)                            
                                setEmailError('');
                            }}
                        />       
                        {emailError && <div className='error-message'>{emailError}</div>}
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