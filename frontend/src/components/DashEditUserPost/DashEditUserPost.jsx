import './DashEditUserPost.css'
import {Link} from 'react-router-dom'


const DashEditUserPost = () => {
  return (
    <div className='container-DashEditUserPost'>
        <div className='Main-DashEditUserPost'>
            <img
                src='https://i.scdn.co/image/ab67706c0000da8480299819e2aa1ff76633012d'
                alt='img-DashEditUserPost'
                className='img-DashEditUserPost'
            />
            <span className='span-DashEditUser'><span className='info-DashEditUser'>id </span>6411011660027</span>
            <div className='line-Post'></div>
            <span className='span-DashEditUser'><span className='info-DashEditUser'>Username </span>fkmejgeijebp</span>
            <div className='line-Post'></div>
            <span className='span-DashEditUser'><span className='info-DashEditUser'>ชื่อ </span>trbaeibiikieydwad</span>
            <div className='line-Post'></div>
            <span className='span-DashEditUser'><span className='info-DashEditUser'>นามสกุล </span>gfnnl,gfnkpofthkt</span>
            <div className='line-Post'></div>
            <span className='span-DashEditUser'><span className='info-DashEditUser'>Email </span>somchai@gmail.com</span>
        </div>
        <Link className='link btn-DashEditUserPost' to='/AdminSingleEditUser'>
          <i class="IconEdit fa-regular fa-pen-to-square"></i>
        </Link>
    </div>
  )
}

export default DashEditUserPost