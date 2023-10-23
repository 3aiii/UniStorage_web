const router = require('express').Router()
const conn = require('../server/conn')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const secret = 'Login-2023-SE' 
// REGISTER
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

// LOGIN
// router.post('/login',async (req,res)=>{
//     let mysql = `SELECT student_username,student_password,student_fname FROM student WHERE student_username = ? `

//     try {
//         conn.query(
//             mysql,
//             [req.body.username],
//             (err,user,field)=>{
//                 if(err){
//                     res.status(404).send(err); return }
//                 if(user.length == 0 ){
//                     res.status(404).send('no user found'); return }        
//                 bcrypt.compare(req.body.password,user[0].student_password, (err,isLogin)=>{
//                     if(isLogin){
//                         var token = jwt.sign({ username: user[0].student_username }, secret ,{ expiresIn : '1h'});
//                         res.status(200).json({status : 'Login success',token})

//                     } else{
//                         res.status(404).send('Login failed')
//                     }
//                 })
//             } 
//         )
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const studentQuery = `
      SELECT student_username, student_password, 'student' AS role
      FROM student
      WHERE student_username = ?
    `;
  
    const teacherQuery = `
      SELECT teacher_username, teacher_password, 'teacher' AS role
      FROM teacher
      WHERE teacher_username = ?
    `;
    let queries = [studentQuery, teacherQuery];

    try {
        let user = { username, role: null };
        for (let query of queries) {
          conn.query(query, [username], (err, results) => {
            if (err) {
              return res.status(500).json({ message: err });
            }
      
            if (results.length > 0) {
              const userData = results[0];
              bcrypt.compare(password, userData.password, (err, isLogin) => {
                if (isLogin) {
                  user.role = userData.role;
                  const token = jwt.sign({ username, role: user.role }, secret, { expiresIn: '1h' });
                  let destination;
                  if (user.role === 'student') {
                    res.status(200).json({status : 'Login success student',role : user.role,token})
                    // destination = 'home';
                } else if (user.role === 'teacher') {
                    res.status(200).json({status : 'Login success teacher',role : user.role,token})
                    // destination = 'dashboard';
                  }
                  res.status(200).json({ status: 'Login success', token, destination });
                }
              });
            }
          });
        }
        
    } catch (error) {
        setTimeout(() => {
          if (user.role === null) {
            res.status(401).json({ message:error });
          }
        }, 1000);
        
    }
  
});



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

module.exports = router