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
import { Taskchart} from "./Taskchart"
import { Task } from "./Task"
import { Capstone } from "./Capstone"
import { Webcode } from "./Webcode"



export const App = () => {
  const[id,setId]=useState(0)
  const[userId,setUserId]=useState(null)
  const[name,setName]=useState(null)
  return (
 <>
 <BrowserRouter>
 <div>
<Navbar/>
 </div>
 <Routes>
 
  <Route path='/register' element={<Register/>}/>
  <Route path="/" element={<Login setUserId={setUserId} setName={setName}/>}/>
  <Route path="/mentorDashboard" element={<MentorDashboard setId={setId}/>}/>
    <Route path="/forgotpassword" element={<ForgotPassword/>}/>
      <Route path="/resetpassword/:token" element={<Resetpassword/>}/>
      <Route path='/addmarks/:id' element={<Add id={id}/>}/>
      <Route path='/student/:userId' element={<Task userId={userId} name={name}/>}/>
      <Route path='/taskchart' element={<Taskchart name={name} userId={userId}/>}/>
      <Route path='/capstone' element={<Capstone userId={userId} name={name} />}/>
       <Route path='/webcode' element={< Webcode userId={userId} name={name} />}/>
 </Routes>
 </BrowserRouter>

 </>
  )
}


export default App
