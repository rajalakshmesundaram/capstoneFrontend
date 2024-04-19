import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

  export const Task = ({ userId }) => {
    const navigate=useNavigate()
  const [frontsmarks, setFsMarks] = useState('');
  const [backsmarks, setBsMarks] = useState('');
  const [frontdmarks, setFdMarks] = useState('');
  const [backdmarks, setBdMarks] = useState('');
  

  const handleSaveMarks = async () => {
    try {
      const response = await axios.post(`https://capstonebackend-1-34dv.onrender.com/api/getMarks/${userId}`, {
        frontsmarks,
        backsmarks,
        frontdmarks,
        backdmarks
      });
      console.log('Marks saved successfully:', response.data);
      // Optionally, you can reset the form after successful submission
      resetForm();
      navigate('/')
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

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12 d-flex flex-column justify-content-center align-items-center">
          <div className="col-md-6">
            <h1>Task Submission</h1>
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


