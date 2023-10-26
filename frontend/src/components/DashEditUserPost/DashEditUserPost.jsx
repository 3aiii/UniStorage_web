import './DashEditUserPost.css'
import {Link} from 'react-router-dom'


const DashEditUserPost = ({deup}) => {
  return (
    <div className='container-DashEditUserPost'>
        <div className='Main-DashEditUserPost'>
            <img
                src='https://i.scdn.co/image/ab67706c0000da8480299819e2aa1ff76633012d'
                alt='img-DashEditUserPost'
                className='img-DashEditUserPost'
            />
            <span className='span-DashEditUser'><span className='info-DashEditUser'>id </span>{deup.student_id}</span>
            <div className='line-Post'></div> 
            <span className='span-DashEditUser'><span className='info-DashEditUser'>Username </span>{deup.student_username}</span>
            <div className='line-Post'></div>
            <span className='span-DashEditUser'><span className='info-DashEditUser'>ชื่อ </span>{deup.student_fname}</span>
            <div className='line-Post'></div>
            <span className='span-DashEditUser'><span className='info-DashEditUser'>นามสกุล </span>{deup.student_lname}</span>
            <div className='line-Post'></div>
            <span className='span-DashEditUser'><span className='info-DashEditUser'>Email </span>{deup.student_email}</span>
        </div>
        <Link className='link btn-DashEditUserPost' to='/AdminSingleEditUser'>
          <i class="IconEdit fa-regular fa-pen-to-square"></i>
        </Link>
    </div>
  )
}

export default DashEditUserPost