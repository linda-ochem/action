import { createContext, useReducer } from "react";

export const WorkoutContext = createContext()
export const workoutReducer = (state, action)=>{
  switch (action.type) {
    case 'SET_WORKOUT':
        return{
            workout: action.payload
        }
    case 'CREATE_WORKOUT':
        return{
            workout: [action.payload, ...state.workout]
        }
        case 'DELETE_WORKOUT':
            return{
                workout: state.workout.filter((w)=>w._id !== action.payload._id)
            }
    default:
        return state
  }
}

export const WorkoutContextProvider =({children})=>{
    const [state, dispatch] = useReducer(workoutReducer, {
        Workout: null
    })
    return(
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
}

