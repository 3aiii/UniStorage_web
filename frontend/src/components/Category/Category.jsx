import { Link } from 'react-router-dom'
import './Category.css'
import { useState } from 'react';

const Category = () => {
    const [activeMenu, setActiveMenu] = useState(0);
    const Category = [
        'All','Network','Multimedia','Artificial Intelligence'
    ]
    
    const handleClick = (menuId) => {
        setActiveMenu(menuId);
    };

    return (
        <div className='Container-Category'>
            <ul className='Category-Ul'>
                {
                    Category.map((Cat,idx)=>(
                        <Link 
                            to={'/'} 
                            className={`Category-li ${activeMenu === idx ? 'active  ': ''} `} 
                            onClick={()=> handleClick(idx)}
                            key={idx}>{Cat}
                        </Link>
                    ))
                }                
            </ul>
        </div>
    )
}

export default Category