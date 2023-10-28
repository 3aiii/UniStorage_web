const router = require('express').Router()
const conn = require('../server/conn')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = 'Login-2023-SE' 

// REGISTER USER
router.post('/register',jsonParser,async(req,res)=>{
    const { username , password , fname, lname, email } = req.body
    let mysql = `INSERT INTO student (student_username,student_password,student_fname,student_lname,student_email) VALUES (? ,? ,? ,? ,?)` 

    bcrypt.hash(password, saltRounds, (err, hash)=>{
        try {
            conn.query(
                mysql,
                [username,hash,fname,lname,email],
                (err,result,field)=>{
                    if(err){
                        res.status(404).send(err)
                        return
                    } else{
                        res.status(200).send(result)
                    }
                } 
            )
        } catch (error) {
            res.status(400).send(error)
        }
    });
})

// LOGIN USER
router.post('/login',async (req,res)=>{
    let mysql = `SELECT student_id,student_username,student_password,student_fname,student_lname FROM student WHERE student_username = ? `

    try {
        conn.query(
            mysql,
            [req.body.username],
            (err,user,field)=>{
                if(err){
                    res.status(404).send(err); return }
                if(user.length == 0 ){
                    res.status(404).send('no user found'); return }        
                bcrypt.compare(req.body.password,user[0].student_password, (err,isLogin)=>{
                    if(isLogin){
                        const token = jwt.sign({ username: user[0].student_username }, secret ,{ expiresIn : '1h'});
                        res.status(200).json({status : 'Login success',token, data : user})

                    } else{
                        res.status(404).send('Login failed')
                    }
                })
            } 
        )
    } catch (error) {
        res.status(400).send(error)
    }
})

// AUTHEN
router.post('/authen',jsonParser,async(req,res)=>{
    try {
        const token = req.headers('Authorization').split(' ')[1]
        var decoded = jwt.verify(token, secret);
        res.json({status : 'ok' ,decoded})        
    } catch (error) {
        res.json({status : 'error' ,message : error.message})                
    }
})

// LOGIN ADMIN
router.post('/loginadmin',async (req,res)=>{
    let mysql = `SELECT teacher_id,teacher_username,teacher_password,teacher_fname,teacher_lname FROM teacher WHERE teacher_username = ? `

    try {
        conn.query(
            mysql,
            [req.body.username],
            (err,user,field)=>{
                if(err){
                    res.status(404).send(err); return 
                }
                if(user.length == 0 ){
                    res.status(404).send('no user found'); return 
                } else{
                    res.status(200).json({status : 'Login success', data : user})
                }
            }
        )
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router