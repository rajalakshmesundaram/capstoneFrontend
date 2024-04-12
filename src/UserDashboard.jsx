import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export const UserDashboard = ({ userId }) => {
  const [marksData, setMarksData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarksData = async () => {
      try {
        const response = await axios.get(`https://capstonebackend-twoc.onrender.com/api/getusermarks/${userId}`);
        setMarksData(response.data.message);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching marks data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMarksData();
  }, [userId]);
  
  const updateMarks = async () => {
    try {
      // Example data structure for updating marks
      const dataToUpdate = {
        codeKataMarks: 80,
        webkataMarks: 90,
        interviewMarks: 85,
        tasksDate: "2024-04-12" // Assuming the date format needed by the backend
      };

      const response = await axios.post(`https://capstonebackend-twoc.onrender.com/api/getMarks/${userId}`, dataToUpdate);
      setMarksData(response.data.message);
    } catch (error) {
      console.error('Error updating marks:', error);
      setError(error.message);
    }
  };

  const generateChartData = () => {
    // Generate chart data based on marksData
    if (!marksData) {
      return {}; // Return an empty object or handle null marks data gracefully
    }

    return {
      labels: ['Codekata', 'Webkata'],
      datasets: [
        {
          label: 'Marks',
          backgroundColor: ['rgba(75,192,192,0.2)', 'rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(75,192,192,1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1,
          hoverBackgroundColor: ['rgba(75,192,192,0.4)', 'rgba(255, 99, 132, 0.4)'],
          hoverBorderColor: ['rgba(75,192,192,1)', 'rgba(255, 99, 132, 1)'],
          data: [marksData?.codeKataMarks || 0, marksData?.webkataMarks || 0],
        },
      ],
    };
  };

  const generateChartOptions = () => {
    return {
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        title: {
          display: true,
          text: 'Bar Chart with Category Scale',
        },
        scales: {
          x: {
            type: 'category',
          },
        },
      },
    };
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {marksData && (
        <div>
          <h1>Student Dashboard {marksData.name}</h1>
          <button onClick={updateMarks}>Update Marks</button>
          <div>
            <Bar data={generateChartData()} options={generateChartOptions()} />
          </div>
        </div>
      )}
    </div>
  );
};
