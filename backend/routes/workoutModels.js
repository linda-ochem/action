const express = require('express')
const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout }= require ('../controllers/workoutController')

const Router = express.Router()

Router.get('/', getWorkouts)

Router.get('/:id', getWorkout)

Router.post('/',createWorkout)

Router.patch('/:id', updateWorkout)

Router.delete('/:id',deleteWorkout )



module.exports = Router