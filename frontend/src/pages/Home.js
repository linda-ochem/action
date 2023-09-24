import { useEffect } from "react"

//components
import Details from "../components/workoutDetails"
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutContext } from "../hooks/useWorkoutContext"

const Home = ()=>{
    const {workout,dispatch} = useWorkoutContext()
    // const [workout, setWorkout] = useState(null)
useEffect(()=>{
    const fetchWorkouts = async ()=>{
        const response = await fetch('/api/workout')
        const json = await response.json()

        if(response.ok){
            // setWorkout(json)
            dispatch({type: 'SET_WORKOUT' , payload: json})
        }
    }
    fetchWorkouts()
},[dispatch])
    return(
        <div className="home">
            <div className="workout">
               {workout && workout.map(item=>(
                <Details  item={item} key={item._id}/>
               ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home

