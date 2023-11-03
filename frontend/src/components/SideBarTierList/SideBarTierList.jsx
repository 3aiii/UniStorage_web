import './SideBarTierList.css'
import { Link } from 'react-router-dom'

const SideBarTierList = ({post}) => {
    return (
        <div className='Container-SideBarTierList'>
            <div className='Main-Box-SideBarTierList'>
                <img
                    src='https://assets.incisivemedia.com/production/cover/images/branding_logo.png'
                    alt='SideBarTierList-img'
                    className='SideBarTierList-img'
                />
                <Link to={`/singlePage/${post.project_id}`} className='link SideBarTierList-p'>
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