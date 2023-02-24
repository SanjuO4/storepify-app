import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import axios from "axios";
import { useAuth } from '../../context/auth';
import moment from "moment";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
            setOrders(data);
        } catch (error) {
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);


    return (
        <Layout title={"Your Orders"}>
            <div className="container-fluid p-3">
                <div className="row user-orders-details">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h2 className='text-center mt-3' style={{ "color": "#fff" }}>Your Orders</h2>
                        {orders?.map((o, i) => {
                            return (
                                <div className="border shadow mb-4">
                                    <div className="orders-description">
                                        <div className="orders-description-details">
                                            <div className="orders-description-details-item">#</div>
                                            <div className="orders-description-details-item">Status</div>
                                            <div className="orders-description-details-item">Buyer</div>
                                            <div className="orders-description-details-item">Date</div>
                                            <div className="orders-description-details-item">Quantity</div>
                                            <div className="orders-description-details-item">Total Amount</div>
                                        </div>
                                        <div className="orders-description-details">
                                            <div className="orders-description-details-item">{i + 1}</div>
                                            <div className="orders-description-details-item">
                                                {o?.status}
                                            </div>
                                            <div className="orders-description-details-item">{o?.buyer?.name}</div>
                                            <div className="orders-description-details-item">{moment(o?.createdAt).format("DD-MM-YYYY")}</div>
                                            <div className="orders-description-details-item">{o?.products?.length}</div>
                                            <div className="orders-description-details-item">₹{o?.totalPrice}</div>
                                        </div>
                                    </div>
                                    <div className="container">
                                        {o?.products?.map((p, i) => (
                                            <div className="row mb-2 p-3 card flex-row orders" key={p._id}>
                                                <div className="col-md-4">
                                                    <img
                                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                                        className="orders-card-img"
                                                        alt={p.name}
                                                        width="100px"
                                                        height={"100px"}
                                                    />
                                                </div>
                                                <div className="col-md-8 orders-desc">
                                                    <p>Name : {p.name}</p>
                                                    <p>Description : {p.description.substring(0, 45)}</p>
                                                    <p>Price : ₹{p.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders;