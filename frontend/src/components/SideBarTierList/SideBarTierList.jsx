import './SideBarTierList.css'
import { Link } from 'react-router-dom'

const SideBarTierList = () => {
    return (
        <div className='Container-SideBarTierList'>
            <div className='Main-Box-SideBarTierList'>
                <img
                    src='https://assets.incisivemedia.com/production/cover/images/branding_logo.png'
                    alt='SideBarTierList-img'
                    className='SideBarTierList-img'
                />
                <Link to='/singlePage/6' className='link SideBarTierList-p'>
                    Lorem Ipsum is simply dummy text of the printing 
                    and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since 
                    the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type
                    specimen book. 
                </Link>
            </div>
            <div className='TierList-Viewed'>
                <div className='Info-Iconviewd'>
                    <i className="IconView fa-regular fa-eye"></i> 
                    3245 view
                </div>
            </div>
        </div>
    )
}

export default SideBarTierList