import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
    const navigate=useNavigate()
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4007/api/forgotpassword', {email});
            const data = response.data;
            setMessage(data.message);
          navigate(`/resetpassword/${token}`);
        } catch (error) {
            console.error('Error:', error.response.data);
            setMessage("An error occurred");
        }
        
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <h1>Forgot Password</h1>
                <p>Please enter your email address below. We will send you instructions on how to reset your password.</p>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" name="email"value={email} onChange={handleChange} placeholder="Enter your email" required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <div className="mt-3">
                    {message && <div className="alert alert-info" role="alert">{message}</div>}
                </div>
            </form>
        </div>
    );
};
