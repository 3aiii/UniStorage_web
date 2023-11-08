import CategorySingle from '../../components/CategorySingle/CategorySingle'
import NavBar from '../../components/Navbar/NavBar'
import './CategoryPage.css'

const CategoryPage = () => {
  
  return (
    <div className='CategoryPage'>
        <NavBar/>
        <div className='Container-CategoryPage'>
          <CategorySingle/>
        </div>
    </div>
  )
}

export default CategoryPage