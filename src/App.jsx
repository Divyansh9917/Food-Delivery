import { useState } from 'react'
import Home from './Screens/Home'
import Login from './Screens/Login'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={<Login/>} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
