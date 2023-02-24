import React from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
    const [auth] = useAuth();

    return (
        <Layout>
            <div className="container-fluid p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 admin-details">
                        <div className="card w-75 p-3">
                            <h4> Admin Name : <span className='admin-details-item'>{auth?.user?.name}</span></h4>
                            <h4> Admin Email : <span className='admin-details-item'>{auth?.user?.email}</span></h4>
                            <h4> Admin Contact : <span className='admin-details-item'>{auth?.user?.phone}</span></h4>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard;