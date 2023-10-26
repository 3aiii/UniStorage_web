const router = require('express').Router()
const conn = require('../server/conn')

// FEACTH USER
router.get('/getuser',async(req,res)=>{
    const search = req.query.search
    let params = []
    let mysql = `SELECT * FROM student `

    if(search){
        mysql = `SELECT * FROM student WHERE student_lname LIKE ?`
        params.push('%'+ search +'%')
    }
    
    try {
        conn.query(
            mysql,
            params,
            (err,result,field)=>{
                if (err){
                    res.json({status : 'error in result',message : err})
                } else{
                    res.json({status : 'ok', data : result})
                    
                }
            }
        )
    } catch (error) {
        res.json({status : 'error' , message : error})
    }
})

module.exports = router