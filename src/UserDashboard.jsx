import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export const UserDashboard = ({ userId }) => {
  const [marksData, setMarksData] = useState(null);

  useEffect(() => {
    const fetchMarksData = async () => {
      try {
        const response = await axios.get(`http://localhost:4007/api/getusermarks/${userId}`);
        setMarksData(response.data.message);
      } catch (error) {
        console.error('Error fetching marks data:', error);
      }
    };

    fetchMarksData();
  }, [userId]);
  
  const generateChartData = () => {
    if (!marksData) {
      return {}; // Return an empty object or handle null marks data gracefully
    }

    const options = {
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
            type: 'category', // Set x-axis scale as category
          },
        },
      },
    };

    return {
      labels: ['Code Kata', 'Web Kata', 'Interview','task'], // Assuming these are the labels for different types of marks
      datasets: [
        {
          label: 'Marks',
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75,192,192,0.4)',
          hoverBorderColor: 'rgba(75,192,192,1)',
          data: [
            marksData?.codeKataMarks || 0,
            marksData?.webkataMarks || 0,
            marksData?.interviewMarks || 0,
            marksData?.tasksMarks || 0
          ], // Assuming codeKataMarks, webKataMarks, and interviewMarks are keys in the marksData object
        },
      ],
    };
  };

  return (
    <div>
      {marksData && (
        <div>
          <h1> Student Dashboard  {marksData.name}</h1>
          <div>
            <Bar data={generateChartData()} options={Option}/>
          </div>
        </div>
      )}
    </div>
  );
};
