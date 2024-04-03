import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const MentorDashboard = ({setId}) => {
  const navigate=useNavigate()
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4007/api/getalluser');
        setUsers(response.data.message);
        console.log(response.data.message)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
 const handleAdd=(id)=>{
setId(id)
navigate(`/addmarks/${id}`)
  }

  return (
    <div>
      <h1>Mentor Dashboard</h1>
      
         <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Add Marks</th>
            
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><button className="btn btn-success"onClick={()=>{handleAdd(user._id)}}>ADD</button></td>
             
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MentorDashboard;
