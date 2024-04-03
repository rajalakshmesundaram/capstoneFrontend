import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const Resetpassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://capstonebackend-twoc.onrender.com/api/resetpassword', {token, newPassword });
            const data = response.data;
            setMessage(data.message);
        } catch (error) {
            console.error('Error:', error.response.data);
            setMessage("An error occurred");
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <h1>Reset Password</h1>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">New Password:</label>
                    <input type="password" className="form-control" id="password" value={newPassword} onChange={handleChange} placeholder="Enter your new password" required />
                </div>
                <button type="submit" className="btn btn-primary">Reset Password</button>
                <div className="mt-3">
                    {message && <div className="alert alert-info" role="alert">{message}</div>}
                </div>
            </form>
        </div>
    );
};

