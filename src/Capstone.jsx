import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style/Task.css"
  export const Capstone = ({ userId , name}) => {
    const navigate=useNavigate()
     const [isLoggedIn, setIsLoggedIn] = useState(true);
    const[createmessage,setMessage]=useState('')
  const [frontsmarks, setFsMarks] = useState('');
  const [backsmarks, setBsMarks] = useState('');
  const [frontdmarks, setFdMarks] = useState('');
  const [backdmarks, setBdMarks] = useState('');
  

  const handleSaveMarks = async () => {
    try {
      const response = await axios.post(`https://capstonebackend-7.onrender.com/api/getcapstone/${userId}`, {
        frontsmarks,
        backsmarks,
        frontdmarks,
        backdmarks
      });
      console.log('Marks saved successfully:', response.data);
      setMessage(response.data.message)
      navigate('/taskchart')
     
      // Optionally, you can reset the form after successful submission
     
      
    } catch (error) {
      console.error('Error saving marks:', error);
      // Handle error and provide feedback to the user
    }
  };
  
  const resetForm = () => {
    setFsMarks('');
    setBsMarks('');
    setFdMarks('');
    setBdMarks('')
    
  };
  const handleLogin = () => {
        // You can implement your login logic here.
        // For example, setting isLoggedIn to true and setting userData.
        setIsLoggedIn(true);
        
    };

    const handleLogout = () => {
        // You can implement your logout logic here.
        // For example, setting isLoggedIn to false and clearing userData.
        setIsLoggedIn(false);
        navigate('/')
    };
   
 

  return (
    
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12 d-flex flex-column justify-content-center align-items-center">
          <div className="col-md-6">
           <div className="user-info">
                {isLoggedIn && (
                    <div className="user-profile">
                        <span>Welcome, {name}</span>
                        <img src="data:image/png;base64,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" alt="User" />
                    </div>
                )}
                {!isLoggedIn && (
                    <button onClick={handleLogin}>Login</button>
                )}
                {isLoggedIn && (
                    <button  onClick={handleLogout}>Logout</button>
                )}
            </div>
            <h1>Capstone Submission</h1>
            <div className="mb-3">
              <label className="form-label">Front-end Source code</label>
              <input type="text" className="form-control" value={frontsmarks} onChange={(e) => setFsMarks(e.target.value)} />
            </div>
           
            <div className="mb-3">
              <label className="form-label">Back-end Source code:</label>
              <input type="text" className="form-control" value={backsmarks} onChange={(e) => setBsMarks(e.target.value)} />
            </div>
             <div className="mb-3">
              <label className="form-label">Front-end Deployed URL</label>
              <input type="text" className="form-control" value={frontdmarks} onChange={(e) => setFdMarks(e.target.value)} />
            </div>
             <div className="mb-3">
              <label className="form-label">Back-end Deployed URL</label>
              <input type="text" className="form-control" value={backdmarks} onChange={(e) => setBdMarks(e.target.value)} />
            </div>
        
        
            <button className="btn btn-primary" onClick={handleSaveMarks}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};