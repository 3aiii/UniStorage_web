import './Category.css'

const Category = () => {

    const Category = [
        'All','Network','Multimedia','Artificial Intelligence'
    ]

    return (
        <div className='Container-Category'>
            <ul className='Category-Ul'>
                {
                    Category.map((Cat,idx)=>(
                        <li className='Category-li' key={idx}>{Cat}</li>
                    ))
                }                
            </ul>
        </div>
    )
}

export default Category