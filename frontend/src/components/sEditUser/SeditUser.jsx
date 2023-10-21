import './SeditUser.css'

const SeditUser = () => {
  return (
    <div className='Container-SeditUser'>
        <div className='Main-SeditUser'>
            <h1 className='h1-SeditUser'>แก้ไขข้อมูลนักศึกษา <span className='span-DashEditUser'>ID 64110116600**</span></h1>
            <form className='form-edit-SeditUser' encType='multipart/form-data'>
                <div className='EditInfo-SeditUser'>
                    <div className='double-container'>
                        <label className='lb-SeditUser'>Username</label>
                        <input
                            className='ip Username'
                            type='text'
                            placeholder='dwdwdw'
                        />
                        <label className='lb-SeditUser'>FirstName</label>
                        <input
                            className='ip FirstName'
                            type='text'
                            placeholder='dwdwdw'
                        />
                    </div>
                    <div className='double-container'>                        
                        <label className='lb-SeditUser'>Password</label>
                        <input
                            className='ip Password'
                            type='text'
                            placeholder='dwdwdw'
                        />                
                        <label className='lb-SeditUser'>LastName</label>
                        <input
                            className='ip LastName'
                            type='text'
                            placeholder='dwdwdw'
                        />
                    </div>
                </div>
                <div className='single-container'>
                    <label className='lb-SeditUser email'>Email</label>
                    <input
                        className='ip email'
                        type='text'
                        placeholder='dwdwdw'
                    />                
                </div>
                <div className='btn-container'>
                    <button className='btnSeditUser cancel'>ยกเลิก</button>
                    <button className='btnSeditUser submit'>บันทึก</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SeditUser