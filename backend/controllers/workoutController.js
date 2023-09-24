const Workout = require('../models/workout')
const mongoose = require ('mongoose')

//create workout
const createWorkout = async (req, res)=>{
    const {title,reps,load} = req.body;
    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'please fill all the required fields', emptyFields})
    }
    try {
        const workout = await Workout.create({title,reps,load})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//get all worlout
const getWorkouts = async (req, res)=>{
    const workout = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workout)
}

//get single workout
const getWorkout = async (req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such workout'})
    }
    const workout = await Workout.findById({_id:id})

    if(!workout){
        return res.status(404).json({error: 'no such workout session'})
    }
    res.status(200).json(workout)
}

//delete workout
const deleteWorkout = async (req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error: "not a valid ID"})
    }
    const workout = await Workout.findOneAndDelete({_id: id})
    if(!workout){
        return res.status(400).json({error: "No such record found"})
    }
    res.status(200).json(workout)
}

//update workout
const updateWorkout = async (req, res)=>{
    const {id} = req.params
    // const body = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "No such data available."})
    }
    const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body})
    if(!workout){
        res.status(404).json({error: "No such workout session"})
    }
    res.status(200).json(workout)
}

module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
} 