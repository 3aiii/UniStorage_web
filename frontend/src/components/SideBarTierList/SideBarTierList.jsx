import axios from 'axios'
import './SideBarTierList.css'
import { Link } from 'react-router-dom'

const SideBarTierList = ({post}) => {
    const PF = "http://localhost:3000/img/"

     // HANDLE VIWER 
    const HandleViewer = async() =>{
        await axios.put(`http://localhost:3000/api/Post/singlePage/${post.project_id}`)
    }

    return (
        <div className='Container-SideBarTierList'>
            <div className='Main-Box-SideBarTierList'>
                <img
                    src={PF + post.project_img_file}
                    alt='SideBarTierList-img'
                    className='SideBarTierList-img'
                />
                <Link to={`/singlePage/${post.project_id}`} className='link SideBarTierList-p' onClick={HandleViewer}>
                    {
                        post.project_name
                    }
                </Link>
            </div>
            <div className='TierList-Viewed'>
                <div className='Info-Iconviewd'>
                    <i className="IconView fa-regular fa-eye"></i> 
                    {post.project_viewer} view
                </div>
            </div>
        </div>
    )
}

export default SideBarTierList