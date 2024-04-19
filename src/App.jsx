import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import { Register } from "./Register"
import { Login } from "./Login"
import { Navbar } from "./Navbar"
import { Home } from "./Home"
import { ForgotPassword } from "./Forgotpassword"
import { Resetpassword } from "./Resetpassword"
import MentorDashboard from "./MentorDashboard"
import { useState } from "react"
import { Add } from "./Add"
import { UserDashboard } from "./UserDashboard"
import { Task } from "./Task"



export const App = () => {
  const[id,setId]=useState(0)
  const[userId,setUserId]=useState(null)
  return (
 <>
 <BrowserRouter>
 <div>
  <Navbar/>
 </div>
 <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/register' element={<Register/>}/>
  <Route path="/login" element={<Login setUserId={setUserId}/>}/>
  <Route path="/mentorDashboard" element={<MentorDashboard setId={setId}/>}/>
    <Route path="/forgotpassword" element={<ForgotPassword/>}/>
      <Route path="/resetpassword/:token" element={<Resetpassword/>}/>
      <Route path='/addmarks/:id' element={<Add id={id}/>}/>
      <Route path='/student/:userId' element={<Task userId={userId} />}/>
 </Routes>
 </BrowserRouter>

 </>
  )
}


export default App
