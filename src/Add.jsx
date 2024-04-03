import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

  export const Add = ({ id }) => {
    const navigate=useNavigate()
  const [codeKataMarks, setCodeKataMarks] = useState('');
  const [webkataMarks, setWebKataMarks] = useState('');
  const [tasksMarks, setTasksMarks] = useState('');
  const [interviewMarks, setInterviewMarks] = useState('');
  const [tasksDate, setTasksDate] = useState('');

  const handleSaveMarks = async () => {
    try {
      const response = await axios.post(`https://capstonebackend-twoc.onrender.com/api/getMarks/${id}`, {
        codeKataMarks,
        webkataMarks,
        tasksMarks,
        interviewMarks,
        tasksDate
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
    setCodeKataMarks('');
    setWebKataMarks('');
    setTasksMarks('');
    setInterviewMarks('');
    setTasksDate('');
    
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12 d-flex flex-column justify-content-center align-items-center">
          <div className="col-md-6">
            <h1>Enter Marks</h1>
            <div className="mb-3">
              <label className="form-label">Code Kata Marks:</label>
              <input type="text" className="form-control" value={codeKataMarks} onChange={(e) => setCodeKataMarks(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Web Kata Marks:</label>
              <input type="text" className="form-control" value={webkataMarks} onChange={(e) => setWebKataMarks(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Tasks Marks:</label>
              <input type="text" className="form-control" value={tasksMarks} onChange={(e) => setTasksMarks(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Interview Marks:</label>
              <input type="text" className="form-control" value={interviewMarks} onChange={(e) => setInterviewMarks(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Date:</label>
              <input type="date" className="form-control" value={tasksDate} onChange={(e) => setTasksDate(e.target.value)} required />
            </div>
            <button className="btn btn-primary" onClick={handleSaveMarks}>Save Marks</button>
          </div>
        </div>
      </div>
    </div>
  );
};


