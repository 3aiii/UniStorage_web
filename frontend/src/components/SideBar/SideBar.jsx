import SideBarTierList from '../SideBarTierList/SideBarTierList'
import './SideBar.css'

const SideBar = () => {
  return (
    <div className='Container-SideBar'>
      <div className='Main-Box-SideBar'>
        <h1 className='h1-TopFive'>TOP 5 MOST VIEWED</h1>
        <div className='TierList-box'>
          <SideBarTierList/>
          <SideBarTierList/>
          <SideBarTierList/>
          <SideBarTierList/>
          <SideBarTierList/>
        </div>
      </div>
    </div>
  )
}

export default SideBar