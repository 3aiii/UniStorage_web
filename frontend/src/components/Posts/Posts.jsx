import { useEffect, useState } from 'react';
import Post from '../Post/Post'
import './Posts.css'
import '../Category/Category.css'
import axios from 'axios'
import { useSelector } from 'react-redux';

const Posts = () => {
  const [activeMenu, setActiveMenu] = useState(0);
  const [allPost,setAllPost] = useState([])
  const [Cat,setCat] = useState([])
  const search  = useSelector((state) => state.search);
  
  // FECTHPOST API
  const fecthPost = async (categoryId) => {
    let mysql = `http://localhost:3000/api/Post/getpost`

    // Check when have category_id event
    if (categoryId === 0) {
      // if we have search parame then gonna add query to api
      if (search){
        mysql += `?search=${search}`
      } 

      const res = await axios.get(mysql);
      setAllPost(res.data.data);

    } else {
      const res = await axios.get(`http://localhost:3000/api/Cat/${categoryId}`);
      setAllPost(res.data.data);
    }
  }

  // FECTH CATEGORY API
  const fecthCategory = async () => {
    const res = await axios.get('http://localhost:3000/api/Cat/');
    setCat([{ category_id: 0, category_name: 'All' }, ...res.data.data]);
  }
  
  // When click button gonna fecth data from fecthPost()
  // We have 2 agrument 1st is index to create a css style
  // 2nd is category_id to fecth post in each other category
  const handleClick = (menuId, categoryId) => {
    setActiveMenu(menuId);
    fecthPost(categoryId);
  }

  useEffect(() => {
    fecthCategory();
    // Set default to 0 because we need to fecth allpost in default !
    fecthPost(0);
  }, [search]);
  return (
    <div className='Container-Posts'>
        <div className='Category-Posts'>
          <div className='Container-Category'>
              <ul className='Category-Ul'>
                  {
                    Cat.map((Cat,idx)=>(
                      <button 
                          className={`Category-li ${activeMenu === idx ? 'active  ': ''} `} 
                          onClick={()=> handleClick(idx,Cat.category_id)}
                          key={idx}>{Cat.category_name}
                      </button>
                    ))
                  }                
              </ul>
          </div>
          { 
            allPost.map((ap)=>(
              ap.project_status ==='Active' && (
                <Post post ={ap} key={ap.project_id}/>
              )
            ))
          }
        </div>
    </div>
  )
}

export default Posts