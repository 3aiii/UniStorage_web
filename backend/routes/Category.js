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
router.get('/CategoryPage/:id',async(req,res)=>{
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

// TREND CATEGORY QUERY
router.get('/TrendCat/:id',async(req,res)=>{
    const category_id = req.params.id

    let mysql = `SELECT * FROM category 
                JOIN project ON category.category_id = project.category_id
                JOIN student ON project.student_id = student.student_id
                WHERE project.category_id = ? ORDER BY project_viewer DESC LIMIT 3;`

    const params = [category_id]

    try {
        conn.query(
            mysql,
            params,
            (err,result,field)=>{
                if(err){
                    res.json({status : 'error',message : err})
                    console.log(err);
                } else{
                    res.json({status : 'success',data : result})
                }
            }
            )
        } catch (error) {
            res.status(500).json({status : 'error',message : error})            
        }
    }
)

module.exports = router