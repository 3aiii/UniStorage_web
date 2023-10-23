const router = require('express').Router()
const conn = require('../server/conn')

// QUERY POST
router.get('/getpost',async(req,res)=>{    

    let mysql = `SELECT * FROM category 
    JOIN project ON category.category_id = project.category_id
    JOIN student ON project.student_id = student.student_id WHERE project.project_status = 'Active' ORDER BY project_id`
    
    conn.query(mysql,[],(err,result,field)=>{
        if(err){
            res.json({status : 'error ',message : err})
        } else{
            res.json({status : 'ok', data : result})
        }
    })
})

// QUERY SINGLE POST
router.get('/:id',async(req,res)=>{
    const id = req.params.id
    let params = [id]
    let mysql = `   
        SELECT * FROM category 
        JOIN project ON category.category_id = project.category_id 
        JOIN student ON project.student_id = student.student_id WHERE project.project_id = ? `
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
            }
            )
        } catch (error) {
            res.status(500).json({status : 'error',message : error})            
        }
})

module.exports = router