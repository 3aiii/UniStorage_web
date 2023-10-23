import Category from '../Category/Category'
import Post from '../Post/Post'
import './Posts.css'

const Posts = ({allPost}) => {

  return (
    <div className='Container-Posts'>
        <div className='Category-Posts'>
          <Category/>
          {
            allPost.map(ap=>(
              ap.project_status ==='Active' && (
                <Post post ={ap} key={ap.prject_id}/>
              )
            ))
          }
        </div>
    </div>
  )
}

export default Posts