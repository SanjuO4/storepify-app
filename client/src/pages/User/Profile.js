import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import axios from "axios";
import { useAuth } from '../../context/auth';

const Profile = () => {
    //context
    const [auth, setAuth] = useAuth();
    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");

    //get user data
    useEffect(() => {
        const { email, name, phone, address, answer } = auth?.user;
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAddress(address);
        setAnswer(answer);
    }, [auth?.user]);

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/auth/profile`, {
                name,
                email,
                phone,
                password,
                address,
                answer,
            });
            if (data?.error) {
                alert(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                alert("Profile Updated Successfully");
            }
        } catch (error) {
            alert("Something went wrong");
        }
    };

    return (
        <Layout title={"Your Profile"}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="user-profile">
                            <div className="user-profile-container">
                                <p>Your Profile</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-item">
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Update Your Name" />
                                    </div>
                                    <div className="form-item">
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Update Your Email" />
                                    </div>
                                    <div className="form-item">
                                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Update Your Phone" />
                                    </div>
                                    <div className="form-item">
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Update Your Password" />
                                    </div>
                                    <div className="form-item">
                                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Update Your Address" />
                                    </div>
                                    <div className="form-item">
                                        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Update Your Favorite Sports Name" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Update Profile</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile;