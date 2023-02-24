import React from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from "../../context/auth";

const UserDashboard = () => {
    const [auth] = useAuth();

    return (
        <Layout title={"Dashboard - Storepify"}>
            <div className="container-fluid p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9 user-details">
                        <div className="card w-75 p-3">
                            <h4>Your Name : <span className='user-details-item'>{auth?.user?.name}</span></h4>
                            <h4>Your Email : <span className='user-details-item'>{auth?.user?.email}</span></h4>
                            <h4>Your Address : <span className='user-details-item'>{auth?.user?.address}</span></h4>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserDashboard;