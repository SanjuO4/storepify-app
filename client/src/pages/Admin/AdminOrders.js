import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
const { Option } = Select;

const AdminOrders = () => {
    const [status, setStatus] = useState([
        "Not Processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
    ]);
    const [changeStatus, setCHangeStatus] = useState("");
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
            setOrders(data);
        } catch (error) {
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const handleChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, {
                status: value,
            });
            getOrders();
        } catch (error) {
        }
    };

    return (
        <Layout title={"All Orders Data"}>
            <div className="row dashboard admin-orders-details">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md ">
                    <h2 className="text-center mt-3" style={{ "color": "#fff" }}>All Orders</h2>
                    {orders?.map((o, i) => {
                        return (
                            <div className="border shadow mb-4">
                                <div className="">
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
                                                <Select
                                                    bordered={false}
                                                    onChange={(value) => handleChange(o._id, value)}
                                                    defaultValue={o?.status}
                                                >
                                                    {status.map((s, i) => (
                                                        <Option key={i} value={s}>
                                                            {s}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div className="orders-description-details-item">{o?.buyer?.name}</div>
                                            <div className="orders-description-details-item">{moment(o?.createdAt).format("DD-MM-YYYY")}</div>
                                            <div className="orders-description-details-item">{o?.products?.length}</div>
                                            <div className="orders-description-details-item">₹{o?.totalPrice}</div>
                                        </div>
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
                                                <p>Name : <span>{p.name}</span></p>
                                                <p>Description : <span>{p.description.substring(0, 45)}</span></p>
                                                <p>Price : <span>₹{p.price}</span></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
};

export default AdminOrders;