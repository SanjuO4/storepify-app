import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    // forgot password handle
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
                email,
                newPassword,
                answer,
            });
            if (res && res.data.success) {
                alert(res.data && res.data.message);
                navigate("/login");
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            alert("Opps! Something went wrong");
        }
    }


    return (
        <Layout title={"Forgot Password - Storepify"}>
            <div className="forgot-password">
                <div className="forgot-password-container">
                    <p>Storepify</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-item">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" required />
                        </div>
                        <div className="form-item">
                            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Enter Your Favorite Sports Name" required />
                        </div>
                        <div className="form-item">
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter New Password" required />
                        </div>
                        <button type="submit" className="btn btn-primary">RESET PASSWORD</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPassword;