const express = require('express')
const connect = require('./server/conn')
const cors = require('cors')

const app = express()
const port = 5000

app.use(express.json)
app.use(cors())

app.listen(port,()=>{
    console.log(`Server is running in port ${port}`);
})

connect.connect((err)=>{
    if(err){
        console.log("Something went wrong" + err);
    } else{
        console.log('Connecting mysql successfully !');
    }
})
