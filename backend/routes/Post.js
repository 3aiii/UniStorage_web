const router = require('express').Router()
const conn = require('../server/conn')
const Upload = require('../middleware/Upload')

// QUERY POST
router.get('/getpost',async(req,res)=>{    
    const search = req.query.search

    let params = []
    let mysql = `SELECT * FROM category 
    JOIN project ON category.category_id = project.category_id
    JOIN student ON project.student_id = student.student_id  ORDER BY project_id`
    
    if(search){
        // console.log('in searh : ',search);
        mysql = `SELECT * FROM category 
            JOIN project ON category.category_id = project.category_id
            JOIN student ON project.student_id = student.student_id WHERE project.project_name LIKE ?`
        params.push('%'+search+'%')
    }
    
    try {
        conn.query(mysql,params,(err,result,field)=>{
            if(err){
                res.json({status : 'error ',message : err})
            } else{
                res.json({status : 'ok', data : result})
            }
        })
    } catch (error) {
        res.json({status : 'error' , message : error})
    }
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
    }
)

// INSERT POST
router.post('/create', Upload,async (req,res)=>{
    const { student_id, project_name ,project_abstract, project_turnitin ,category_id} = req.body
    const project_img_file = req.files.project_img_file[0].filename; 
    const project_pdf_file = req.files.project_pdf_file[0].filename; 
    const project_pdf_path = req.files.project_pdf_file[0].path;

    let mysql = `INSERT INTO project (student_id, project_name, project_abstract, project_turnitin, category_id, project_img_file, project_pdf_file 
        ,project_pdf_path , project_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ? ,'Pending')`

    const params = [student_id,project_name,project_abstract,project_turnitin,category_id,project_img_file,project_pdf_file,project_pdf_path]

    try {
        conn.query(
            mysql,
            params,
            (err,result,field)=>{
                if(err){
                    res.json({status : 'error' ,message : err})
                } else{
                    res.json({status : 'ok', data : result})
                }
            }
        )
    } catch (error) {
        res.status(500).json({status : 'error',message : error})            
    }
})

// UPDATE POST
router.put('/update',Upload,async (req,res)=>{
    const { project_id,project_name ,project_abstract,category_id } = req.body
    let project_img_file, project_pdf_file, project_pdf_path;

    if (req.files.project_img_file) {
        project_img_file = req.files.project_img_file[0].filename;
    }

    if (req.files.project_pdf_file) {
        project_pdf_file = req.files.project_pdf_file[0].filename;
        project_pdf_path = req.files.project_pdf_file[0].path;
    }

    let mysql = `UPDATE project SET 
                        project_name = ?, 
                        project_abstract = ?,
                        category_id = ?`;
    
    const params = [project_name, project_abstract,category_id];

    if (project_img_file) {
        mysql += ', project_img_file = ?';
        params.push(project_img_file);
    }

    if (project_pdf_file) {
        mysql += ', project_pdf_file = ?, project_pdf_path = ?';
        params.push(project_pdf_file, project_pdf_path);
    }

    mysql += ' WHERE project_id = ?';
    params.push(project_id);

    try {
        conn.query(
            mysql,
            params,
            (err,result,field)=>{
                if(err){
                    res.json({status : 'error' ,message : err})
                } else{
                    res.json({status : 'ok', data : result})
                }
            }
        )
    } catch (error) {
        res.status(500).json({status : 'error',message : error})            
    }
})

// INSERT FAVORITE
router.post('/favorite', async(req,res)=>{
    const { student_id , project_id } = req.body

    let mysql = `INSERT INTO favorite (student_id,project_id)
        VALUES (?, ?)`
    
    const params = [student_id,project_id]

    try {
        conn.query(
            mysql,
            params,
            (err,result,field)=>{
                if(err){
                    res.json({status : 'error' ,message : err})
                } else{
                    res.json({status : 'ok', data : result})
                }
            }
        )
    } catch (error) {
        res.status(500).json({status : 'error',message : error})            
    }
})

// DELETE FAVORITE EACH USER
router.delete('/favorite_delete/:student_id/:project_id', (req, res) => {
    const student_id = req.params.student_id;
    const project_id = req.params.project_id;
    let mysql = 'DELETE FROM favorite WHERE favorite.student_id = ? AND favorite.project_id = ?';

    try {
        conn.query(
                mysql,
                [student_id, project_id],
                (err, result, field) => {
                    if (err) {
                        res.status(400).json({ status: 'error', message: err });
                    } else {
                        res.json({ status: 'ok', data: result });
                    }
                }
            )
    } catch (error) {
        res.json({ status: 'error', message: error });
    }
});

// QUERY FAVORTIE EACH USER
router.get('/getfavorite/:id',async(req,res)=>{   
    const student_id  = req.params.id
    let params = [student_id]

    let mysql = ` SELECT * FROM favorite 
    JOIN project ON favorite.project_id = project.project_id
    JOIN student ON project.student_id = student.student_id WHERE favorite.student_id = ?`

    try {
        conn.query(mysql,params,(err,result,field)=>{
            if(err){
                res.json({status : 'error ',message : err})
            } else{
                res.json({status : 'ok', data : result})
            }
        })
    } catch (error) {
        res.json({status : 'error' ,message : error})
    }
})

// APPROVE POST 
router.put('/approve', async(req,res)=>{
    const {project_id,teacher_id} = req.body
    // console.log(project_id);
    let mysql = `UPDATE project
                SET project_status = 'Active',teacher_id = ? WHERE project_id = ?`
    const params = [teacher_id,project_id]
    
    try {
        conn.query(
            mysql,
            params,
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

// REJECT POST 
router.put('/reject', async(req,res)=>{
    const {project_id,teacher_id} = req.body
    let mysql = `UPDATE project
                SET project_status = 'Reject',teacher_id = ? WHERE project_id = ?`
    const params = [teacher_id,project_id]
    
    try {
        conn.query(
            mysql,
            params,
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

// DOWNLOAD PDF
router.get('/PDF/:id',async(req,res)=>{
    const id = req.params.id
    let mysql = `SELECT project_pdf_file,project_pdf_path FROM project WHERE project_id = ?`
    
    try {
        conn.query(
            mysql,
            [id],
            (err,result,field)=>{
                if(err){
                    res.status(404).json({message : err})
                }
                const { project_pdf_path, project_pdf_filename } = result[0];
                // download method if you want to get download to your computer
                res.download(project_pdf_path, project_pdf_filename, (err) => {
                    if (err) {
                      res.sendStatus(500).json({message : err});
                    }
                })
            }   
        )
    } catch (error) {
        res.status(400).send(error)
    }
})

// COUNT PAGE
router.put('/singlePage/:id', async (req, res) => {
    const slug = req.params.id;
    let mysql = 'UPDATE project SET project_viewer = project_viewer + 1 WHERE project_id = ?'

    try {
        conn.query(
                mysql,
                [slug],
                (err, result) => {
                    if (err) {
                        res.json({status : 'Error', message : err})
                    } else{
                        res.json({status : 'Success', data : result})
                    }
                }
            ); 
    } catch (error) {
        res.status(500).json({status : 'error', message : error})
    }
});


// TREND QUERY
router.get('/',async(req,res)=>{
    let mysql = `SELECT * FROM category 
    JOIN project ON category.category_id = project.category_id
    JOIN student ON project.student_id = student.student_id ORDER BY project_viewer DESC LIMIT 5`

    try {
        conn.query(
            mysql,
            [],
            (err,result,field)=>{
                if(err){
                    res.json({status : 'error',message : err})
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

// MY POST
router.get('/mypost/:id',async(req,res)=>{
    const student_id = req.params.id
    let mysql = `SELECT * FROM category 
            JOIN project ON category.category_id = project.category_id
            JOIN student ON project.student_id = student.student_id  WHERE project.student_id = ?`

    const params = [student_id]
    try {
        conn.query(
            mysql,
            params,
            (err,result,field)=>{
                if(err){
                    res.json({status : 'error',message : err})
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