require('dotenv').config();

const express=require('express');
const taskRoutes=require('./routes/tasks')
const userRoutes=require('./routes/user')
const mongoose=require('mongoose');
const db=require('./db/database')

//express app
const app=express();

//middleware
app.use(express.json());

//logger for routes
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

//routes
app.use('/api/tasks',taskRoutes)
app.use('/api/user',userRoutes)


//mongodb and server connection
db(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("Hello server")
        })
    })
    .catch((error)=>{
        console.log(error)
    })

