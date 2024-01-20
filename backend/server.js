require('dotenv').config()
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workoutModels')
const express = require('express')
const app = express()

//Middleware
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})
app.get('/', (req,res)=>{
    res.send('welcome to my app')
})
//connect DB
mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`MongoDB is connected on port ${process.env.PORT}
         Press CTRL+C to stop the server`)
    })
}).catch(err =>{
    console.log(err)
})

app.use('/api/workout/',workoutRoutes)

