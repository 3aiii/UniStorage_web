const router = require('express').Router()
const conn = require('../server/conn')

// FEACTH CATEGORY
router.get('/',async(req,res)=>{
    let sql = `SELECT * FROM category `
    
    try {
        conn.query(
            sql,
            (err,result,field)=>{
                if (err){
                    console.log(err);
                    res.json({status : 'error ',message : err})
                } else{
                    res.json({status : 'ok ', data : result})
                }
            }
        )
    } catch (error) {
        res.status(400).send(error)
    }
})

// FEACTH CATEGORY IN EACH
router.get('/:id',async(req,res)=>{
    const id = req.params.id
    let sql = `SELECT * FROM category 
                JOIN project ON category.category_id = project.category_id
                JOIN student ON project.student_id = student.student_id
                WHERE category.category_id = ? `
    try {
        conn.query(
            sql,
            id,
            (err,result,field)=>{
                if (err){
                    res.json({status : 'error ', message : err})
                } else{
                    res.json({status : 'ok ', data : result})
                }
            }
        )
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router