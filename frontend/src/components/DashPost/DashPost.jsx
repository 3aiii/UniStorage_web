import './DashPost.css'
import axios from 'axios';
import swal from 'sweetalert2';

const DashPost = ({DashPost}) => {

    // APPROVE API
    const HandleApprove = async () =>{
        const Dashboard_Data = {
            project_id : DashPost.project_id
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
            project_id : DashPost.project_id
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

    return (
        <div className='Container-DashPost'>            
            <div className='Box-DashPost'>
                <div className='Info-DashPost'>
                    <img
                        src='https://cdn-icons-png.flaticon.com/512/219/219969.png'
                        alt='img-post'
                        className='DashPost-img'
                    />
                    <h3 className='DashPost-user'>{DashPost.student_username}</h3>
                    <div className='line-Post'></div>
                    <span className='DashPost-date'>{DashPost.project_create}</span>
                    <p className='DashPost-topic'>{DashPost.project_abstract}</p>
                </div>
                <div className='action-DashPost'>
                    <button className='btn download-pdf'><i className="IconDashAdmin fa-solid fa-download"></i></button>
                    <button className='btn approve' onClick={HandleApprove}><i className="IconDashAdmin fa-solid fa-check"></i></button>
                    <button className='btn reject' onClick={HandleReject}><i className="IconDashAdmin fa-solid fa-xmark"></i></button>
                </div>

            </div>
        </div>
    )
}

export default DashPost