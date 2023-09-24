import {useWorkoutContext} from '../hooks/useWorkoutContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
const Details = ({item})=>{
    const {dispatch} = useWorkoutContext()
    const handleClick = async ()=>{
        const response = await fetch('/api/workout/' + item._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }
    return(
        <div className="workout-details">
            <h2>{item.title}</h2>
            <p><strong>Load(kg):</strong>{item.load}</p>
            <p><strong>reps:</strong>{item.reps}</p>
            <p>{formatDistanceToNow(new Date(item.createdAt), {addSuffix: true})}</p>
            <span  className='material-icons' onClick={handleClick}
            >delete</span>
            <p className='material-icons'>edit</p>
        </div>
    )
}
export default Details