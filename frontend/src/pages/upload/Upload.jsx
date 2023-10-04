import './Upload.css'
import NavBar from '../../components/Navbar/NavBar'

const Upload = () => {
  return (
      <div className='Container-Upload'>
        <NavBar/>
        <div className='Box-Main-Upload'>
            <h1 className='h1-Upload'>Upload</h1>
            <div className='Border-Main-Upload'>
                <form className='input-Main-Upload'>
                    <label className='lb projectname'>ชื่อผลงาน</label>
                    <input
                        type='text'
                        className='inputmain projectname'
                    />
                    <label className='lb Abstract'>บทคัดย่อ</label>
                    <textarea type='text'
                        className='inputmain Abstract'>
                    </textarea>
                    <div className='input-sub-upload'>
                        <div className='lbsub 1'>
                            <label className='lb-img'>รูปภาพประกอบ</label>
                            <input
                                type='file'
                                className='inputsub img'
                            />
                        </div>
                        <div className='lbsub 2'>
                            <label className='lb-pdf'>ไฟล์ผลงาน</label>
                            <input
                                type='file'
                                className='inputsub pdf'
                            />
                        </div>
                        <div className='lbsub 3'>
                            <label className='lb-turnitin'>ผล turnitin</label>
                            <input
                                type='number'
                                className='inputsub turnitin'
                                min={0}
                                max={100}
                                placeholder='ข้อมูล turnitin 0 - 100'
                            />
                            {/* <p className='lb-p'><span>*หมายเหตุ</span> : เรียนรู้เพิ่มเติมเกี่ยวกับ turnitin เพิ่มเติมได้ <a className='link LearningHere' target='blank' href='https://w1.med.cmu.ac.th/library/files/Manual_Turnitin-for-Student.pdf'>ที่นี่</a></p> */}
                        </div>
                    </div>
                    <div className='input-sub-cat-submit'>
                        <div className='input-options'>
                            <label className='lb-cat'>หมวดหมู่</label>
                            <div className='box-select'>
                                <select className='inputsub cat' placeholder='Select your category please'>
                                    <option value={1}>Network</option>
                                    <option value={2}>Multimedia</option>
                                    <option value={3}>Artificial Intelligence</option>
                                </select>
                                <i className="IconArrow fa-solid fa-chevron-down"></i>
                            </div>
                        </div>
                        <button className='btn-submit'>Upload</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Upload