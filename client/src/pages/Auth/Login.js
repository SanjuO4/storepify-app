import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // login handle
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/login`, {
                email,
                password,
            });
            if (res && res.data.success) {
                alert(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || "/");
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            alert("Opps! Something went wrong");
        }
    }

    return (
        <Layout title={"Login - Storepify"}>
            <div className="login">
                <div className="login-container">
                    <p>Storepify</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-item">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" required />
                        </div>
                        <div className="form-item">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" required />
                        </div>
                        <button type="submit" className="btn btn-primary">LOGIN</button>
                    </form>
                    <div className='or'>
                        <span>or</span>
                        <Link className='redirect' to='/register'>Register</Link>
                        <Link className='forgot-pass' to='/forgot-password'>Forgot Password?</Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Login