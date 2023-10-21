import Category from '../Category/Category'
import Post from '../Post/Post'
import './Posts.css'

const Posts = () => {
  return (
    <div className='Container-Posts'>
        <div className='Category-Posts'>
          <Category/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
        </div>
    </div>
  )
}

export default Posts