import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { ErrorBoundary } from 'react-error-boundary'
import Fallback from './components/Fallback'

const App=()=>{
  const errorHandler = (error, errorInfo)=>{
    console.log('Logging', error, errorInfo)
  }
  return (
    <div className='App'>
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
    <BrowserRouter>
    <Navbar/>
    <div className='pages'>
      <Routes>
        <Route
          path='/'
          element={<Home/>}
        />
      </Routes>
    </div>
    </BrowserRouter>
    </ErrorBoundary>
    </div>
  )
}

export default App 