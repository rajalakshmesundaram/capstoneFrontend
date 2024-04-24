
import React, { useEffect, useState } from 'react';
import "./style/Taskchart.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Legend, Bar } from 'recharts';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Tooltip } from 'chart.js';
import axios from 'axios';
import { Navbar } from './Navbar';

export const Taskchart = ({name , userId}) => {
    const[data,setData]=useState([])
     const [isLoggedIn, setIsLoggedIn] = useState(true);
     const navigate=useNavigate()
      useEffect(()=>{
        fetchData();
    },[])
     const fetchData = async () => {
    try {
      const response = await axios.get(`https://capstonebackend-7.onrender.com/api/getalluser/${userId}`);
      // Process the data as needed
      console.log(response.data.message);
      setData(response.data.message)
    } catch (error) {
      console.error('Error fetching marks data:', error);
    }
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
    <section className='dashboard pt-2'>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/student/:userId">Tasks</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/capstone">Capstone</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/webcode">Webcode</Link>
            </li>
          </ul>
          {isLoggedIn && (
            <div className="user-info">
              <div className="user-profile ">
                <span>Welcome Student {name}</span>
                
              </div>
              
            </div>
           
          )}
        </div>
      </div>
    </nav>
           
     <div className='activities__box container'>
                <h3 className='text-center p-2'>Activities</h3>
                <div className='problem__solved gap-5'>
                    <div className="codekata">
                        <div className="head">CodeKata Problem Solved</div>
                        <BarChart width={730} height={250} data={data.codeKataScores}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="day" />
  <YAxis />
  <Tooltip />
  <Legend/>
  < Bar dataKey="score" fill="#8884d8" />
 
</BarChart>
                    </div>
                    <div className="webkata">
                        <div className="head ">WebKata Problem Solved</div>
                        <BarChart width={730} height={250} data={data.webKataScores}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="day" />
  <YAxis />
  <Tooltip />
  <Legend/>
  < Bar dataKey="score" fill="#8884d8" />
 
</BarChart>
                    </div>
                </div>
            </div>
            <br />
            <div className='activities__box container'>
                <h3 className='text-center p-2'>Task Status</h3>
                <div>
                  
                    <LineChart width={500} height={300} data={data.taskMarks}>
                        <XAxis dataKey="task" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="1 1" />
                        <Line type="monotone" dataKey="score" stroke="#8884d8" />
                    </LineChart>
                </div>
            </div>
            <br />
            <div className='activities__box container'>
                <h3 className='text-center p-2'>Event Status</h3>
                <div className='problem__solved gap-5'>
                    <div className="codekata">
                        <div className="head">Webcode-1 Score</div>
                        <div className="score text-center">{data.webCodeMarks}</div>
                        <div className='text-center mb-2'></div>
                    </div>
                    <div className="webkata">
                        <div className="head ">Capstone-1 Score</div>
                        <div className="score text-center">{data.capstoneMarks}</div>
                        <div className='text-center mb-2'></div>
                    </div>
                    <div className="webkata">
                        <div className="head ">Mock Interview Avg</div>
                        <div className="score text-center">{data.interviewMarks}</div>
                        <div className='text-center mb-2'></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
