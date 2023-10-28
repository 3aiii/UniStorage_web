const router = require('express').Router()
const conn = require('../server/conn')
const bcrypt = require('bcrypt');
const saltRounds = 10;
// FEACTH USER
router.get('/getuser',async(req,res)=>{
    const search = req.query.search
    let params = []
    let mysql = `SELECT * FROM student `

    if(search){
        mysql = `SELECT * FROM student WHERE student_username LIKE ? OR student_fname LIKE ? OR student_lname LIKE ? `
        params.push('%'+ search +'%','%'+ search +'%','%'+ search +'%')
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

// FEACTH Single User
router.get('/:id',async(req,res)=>{
    const id = req.params.id
    let params = [id]
    let mysql = `SELECT * FROM student WHERE student_id = ?`

    try {
        conn.query(
            mysql,
            params,
            (err,result,field)=>{
                if(err){
                    res.json({status : 'error',message : err})
                } else{
                    res.json({status : 'ok',data : result})
                }
            })
        } catch (error) {
            res.status(500).json({status : 'error',message : error})            
        }
    }
)

// UPDATE POST
router.put('/update',async(req,res)=>{
    const { student_id,student_username,student_password,student_fname,student_lname,student_email } = req.body
    let mysql = `UPDATE student
                SET student_username = ?,
                    student_password = ?,
                    student_fname = ?,
                    student_lname = ?,
                    student_email = ?
                    WHERE student_id = ? `

    bcrypt.hash(student_password, saltRounds, (err, hash) =>{
        try {
            conn.query(
                mysql,
                [student_username,hash,student_fname,student_lname,student_email,student_id],
                (err,result,field)=>{
                    if(err){
                        res.json({status : 'error' , message : err})
                    } else{
                        res.json({status : 'ok' , data : result})                    
                    }
                }
            )
            
        } catch (error) {
            res.json({status : 'error'  , message : error})
        }
    })
})

module.exports = router