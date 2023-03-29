import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    // register handle 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/register`, {
                name,
                email,
                password,
                phone,
                address,
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
        <Layout title={"Register - Storepify"}>
            <div className="register">
                <div className="register-container">
                    <p>Storepify</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-item">
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" required />
                        </div>
                        <div className="form-item">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" required />
                        </div>
                        <div className="form-item">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" required />
                        </div>
                        <div className="form-item">
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Your Phone" required />
                        </div>
                        <div className="form-item">
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Your Address" required />
                        </div>
                        <div className="form-item">
                            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Enter Your Favorite Sports Name" required />
                        </div>
                        <button type="submit" className="btn btn-primary">REGISTER</button>
                    </form>
                    <div className='or'>
                        <span>or</span>
                        <Link className='redirect' to='/login'>Login</Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Register;