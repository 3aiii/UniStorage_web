import './DashPost.css'

const DashPost = () => {
  return (
    <div className='Container-DashPost'>
        <div className='Box-DashPost'>
            <div className='Info-DashPost'>
                <img
                    src='https://cdn-icons-png.flaticon.com/512/219/219969.png'
                    alt='img-post'
                    className='DashPost-img'
                />
                <h3 className='DashPost-user'>Username</h3>
                <div className='line-Post'></div>
                <span className='DashPost-date'>2023-09-27 08:54:07</span>
                <p className='DashPost-topic'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
            </div>
            <div className='action-DashPost'>
                <button className='btn download-pdf'><i className="IconDashAdmin fa-solid fa-download"></i></button>
                <button className='btn approve'><i className="IconDashAdmin fa-solid fa-check"></i></button>
                <button className='btn reject'><i className="IconDashAdmin fa-solid fa-xmark"></i></button>
            </div>

        </div>
    </div>
  )
}

export default DashPost