import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "./style/Login.css"

export const Login = ({setUserId ,setName}) => {
    const navigate=useNavigate()
    const [message, setMessage] = useState('');
   
    const [loginData, setLoginData] = useState({
       email : "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://capstonebackend-7.onrender.com/api/loginUser', loginData);
            setMessage(response.data.message);
            const userId = response.data.userlogin._id;
            const name=response.data.userlogin.name
            console.log(response.data);
            
               setUserId(userId);
               setName(name)
        // Fetch data immediately after setting the user ID
        fetchData(userId)
            
        } catch (error) {
            console.error('Error:', error.response.data);
              setMessage(error.response.data.message);
              clear()
        }
    };
    const fetchData = async (userId) => {
    try {
      const response = await axios.get(`https://capstonebackend-7.onrender.com/api/getalluser/${userId}`);
      // Process the data as needed
      console.log(response.data.message);
   if (Array.isArray(response.data.message.codeKataScores) && response.data.message.codeKataScores.length === 0) {
    // The codeKataScores array is empty
    randomData(userId)
}
else{
  navigate("/taskchart")
}
    
    } catch (error) {
      console.error('Error fetching marks data:', error);
    }
  };
  const randomData=async(userId)=>{
      try {
      const response = await axios.get(`https://capstonebackend-7.onrender.com/api/randomuserdata/${userId}`);
      // Process the data as needed
      console.log(response.data.message);
      navigate("/taskchart")
    } catch (error) {
      console.error('Error fetching marks data:', error);
    }
    }
  const clear=()=>{
    setTimeout(resetform,3000)
  }
  const resetform=()=>{
    setLoginData({
        email : "",
        password: ""
    })
    setMessage('')
  }

    return (
        <div className="loginPage">
            <form onSubmit={handleSubmit}>
                 <div className="row m-0">
                    <div className="col-md-8">
                        <div className="row img__container"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAABtCAIAAAD1Ub40AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAA7TSURBVHhe7Z15bFXFF8f1J5U1FEpFEQIxLlEQZRHXVtAabagFbIpLxBCrGEhM2whCqokK7salldUWMcjPgJEtVGlQCrGICy5VYgghgRrSViqvUKVVWiD5fX7vDON438Lrfa84bebzRzNz78x9c8935pwz7933em5ycnKvXr3OcdhEIBA4d8SIEeeff7464LCDP/744z+q6LAMJ4ylOGEsJUyMaWlpUSXHWSEpKckjATHGK0xbW1tubm7Pnj1V3dHx1NfXV1ZWmiqEEea3337bvXt3SkqKqjs6nurq6uzs7IEDB6p6pKyMRaNKjrNCa2urKhm44G8pThhLccJYihPGUpwwluKEsRQnjKU4YSzFCWMpThhLccJYihPGUsK8u/zdd99ddNFFqh6ZysrKI0eOnHfeeaoemVOnTqWkpGRkZEi1vLz8xIkTUj4jd955Z58+fSjoXlwtPT090ggZEgPTo0pKSsrOzpaytXz99de5ubmed5f9CzNt2rRt27Z1795d1SPT2tqamZm5YsUKqd544421tbWYTKrR+fzzz4cOHfrXX39lZWXt27ePXlzt9ttvLysrC/uh0f79+5FNRoWQQ4YM4bbllLWEFca/K0NO1kH/GKCZqX1ycvKAAQPUucj07duXv6pPcO5LLybNzp07X331VXUiBD0q2nfeJ7P+/RjT1tZ2NBzMGlCN/glGX758uV6CXRL/rozVt2nTJlUxYJLiQMxrtrS04MpKSkqketdddx06dEjCAKoQA8aNG0fkkLMmtJEYgyubMmWK7gW0P378+MqVK3GMckTAlU2ePFlenTYsGvytnLKWBLuytWvXYtZQmpqa0tLSKEgzrMMELyoqkqoHNEOVnJycqeHguET+UFCoR48e06dPRwl1qGuReFfGyti6dateMY2NjcXFxVGWYNi1EgtoQ+CZN29ec3OzOtSFSLAwO3bsICwTt6VKqHj66ac93saD9k4+QP4ff/yRl1D1LkQihTl48ODjjz9+wQUXSBU3NWnSpFmzZkk1LL179yYhJoyHsnTp0urqatUuBL3OmATr1q3TAazL4D/4eyA+P/TQQ3v37pWr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" alt=".." class="logo"/></div>
        <div class="col-md-8 d-flex flex-column justify-content-center align-items-center">
        <div class="col-md-6">
            
           <div className="mb-3">
                    
                    <input type="email" className="form-control" id="UserName" name="email" value={loginData.email} onChange={handleChange} placeholder="Email" required />
                </div>
                <div className="mb-3">
                   
                    <input type="password" className="form-control" id="password" name="password" value={loginData.password} onChange={handleChange} placeholder="Password" required />
                </div>
                <button type="submit" className=" btn btn-lg btn-block login__btn mt-4  ">Login</button>
                <br/><br/>
                <h4>{message}</h4>
                </div></div></div></div>
            </form>
            {/* Link to the Forgot Password page */}
            <div className="row">
        <div className="col-md-8 d-flex flex-column justify-content-center align-items-center">
        <div className="col-md-12"></div>
            <Link to="/forgotpassword" className="btn btn-danger mt-4">Forgot Password?</Link>
            
            <Link to="/register" className="btn btn-success mt-4">Not Register? Sign up</Link>
        <div className="modal-right">
      <img src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80" alt=""/>
    </div>
        
        </div></div></div>
        

       
    );
};
