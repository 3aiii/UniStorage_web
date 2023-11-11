const express = require('express')
const connect = require('./server/conn')
const cors = require('cors')
const auth = require('./routes/Auth')
const post = require('./routes/Post')
const cat = require('./routes/Category')
const user = require('./routes/User')
const path = require('path')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use('/img', express.static(path.join(__dirname, '/img')));
app.use('/api/Auth',auth)
app.use('/api/Post',post)
app.use('/api/Cat',cat)
app.use('/api/User',user)

// connecting mysql
connect.connect((err)=>{
    if(err){
        console.log("Something went wrong" + err);
    } else{
        console.log('Connecting mysql successfully !');
    }
})

// connecting server
app.listen(port,()=>{
    console.log(`Server is running in port ${port}`);
})