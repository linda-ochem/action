import {useState} from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext"



const WorkoutForm = ()=>{
    const {dispatch} = useWorkoutContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async(e)=>{
    e.preventDefault()

    const workout = {title, load, reps};
    const response = await fetch('/api/workout', {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
            'content-type':'application/json'
        }
    })
    const json = await response.json()

    if(!response.ok){
        setError(json.error)
        //styling empty fields to handle error
        setEmptyFields(json.emptyFields)
    }
    if(response.ok){
        setTitle('')
        setLoad('')
        setReps('')
        setError(null)
        //styling empty fields to handle error
        setEmptyFields([])
        console.log('new workout added', json)
        dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  }                                                              
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>
            <label>Exercise Title:</label>
                <input type='text'
                onChange={(e)=>setTitle(e.target.value.toUpperCase())}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
                />

                <label>Load in(kg)</label>
                <input type='number'
                onChange={(e)=> setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error': ''}
                />

                <label>Reps (in Kg)</label>
                <input type='number'
                    onChange={(e)=>setReps(e.target.value)}
                    value= {reps}
                    className={emptyFields.includes('reps') ? 'error': ''}
                />
                <button>Submit Form</button>
                {error&&<div className="error">{error}</div>}
        </form>
        
    )
}
export default WorkoutForm