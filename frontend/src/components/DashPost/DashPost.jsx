import './DashPost.css'
import axios from 'axios';
import swal from 'sweetalert2';
import {Link} from 'react-router-dom'

const DashPost = ({DashPost}) => {
    const postDate = new Date(DashPost.project_create);
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    const formattedDate = postDate.toLocaleDateString('en-US', options);

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
                    <span className='DashPost-date'>{formattedDate}</span>
                </div>
                <Link to={`/singleAdminDash/${DashPost.project_id}`} className='link p-DashPost'>
                    <h1 className='p-h1'>{DashPost.project_name}</h1>
                    <p className='DashPost-topic'>{DashPost.project_abstract}</p>
                </Link>
            </div>
        </div>
    )
}

export default DashPost