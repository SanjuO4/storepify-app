import React, { useState, useEffect } from "react";
import { useCart } from '../context/cart';
import { useAuth } from "../context/auth";
import { json, useNavigate } from "react-router-dom";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import Layout from "../components/Layout/Layout";

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    let totalAmount = 0;
    cart?.map((item) => {
        totalAmount = totalAmount + item.price;
    });

    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            return total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
            });
        } catch (error) {
        }
    };

    //detele item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        }
        catch (error) {
        }
    };

    const handlePlaceOrder = async () => {
        try {
            setLoading(false);
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/place-order`, {
                cart,
            });
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            alert("Order Placed Successfully");
        }
        catch (error) {
            setLoading(false);
        }
    };


    return (
        <Layout title={"My Cart"}>
            <div className=" cart-page">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center p-2 mb-2 mt-1" style={{ "color": "#fff" }}>
                            🛒 My Cart
                        </h2>
                        <h5 className="text-center">
                            {cart?.length
                                ? `${auth?.token ? "" : "Please login to checkout!"}`
                                : `${auth?.token ? "Your cart is empty!" : "Please login to checkout!"}`}
                        </h5>
                    </div>
                </div>
                <div className="container ">
                    <div className="row cart-details">
                        <div className="col-md-7 cart-details-items">
                            {cart?.map((p) => (
                                <div className="row card flex-row" key={p._id}>
                                    <div className="col-md-4">
                                        <img
                                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                            width="100%"
                                            height="100%"
                                        />
                                    </div>
                                    <div className="col-md-4 card-item-details">
                                        <p>Name : <span>{p.name}</span></p>
                                        <p>Description : <span>{p.description.substring(0, 30)}</span></p>
                                        <p>Price : <span>₹{p.price}</span></p>
                                    </div>
                                    <div className="col-md-4 cart-remove-btn">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => removeCartItem(p._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-5 cart-summary ">
                            <h3>Price Details</h3>
                            <p>
                                Total Items : <span>{cart.length}</span>
                            </p>
                            <p>
                                {
                                    cart?.length ?
                                        totalAmount < 500 ? <p>Delivery Charges : <span style={{ "color": "#FC466B" }}>₹40</span></p>
                                            : <p>Delivery Charges : <span style={{ "color": "#1af329" }}>Free Delivery</span></p>
                                        : <p>Delivery Charges : <span style={{ "color": "#ccc", "textTransform": "capitalize" }}>Add items to checkout delivery charges</span></p>
                                }
                            </p>
                            <p>
                                {
                                    cart?.length ?
                                        totalAmount < 500 ? <p>Discount : <span style={{ "color": "#1af329" }}>-₹0</span></p>
                                            : <p>Discount : <span style={{ "color": "#1af329" }}>-₹40</span></p>
                                        : <p>Discount : <span style={{ "color": "#1af329" }}>-₹0</span></p>
                                }
                            </p>
                            <hr />
                            <h4>
                                {
                                    cart?.length ?
                                        totalAmount < 500 ? <h4>Total Amount : <span style={{ "color": "#ccc", "fontSize": "25px" }}>₹{totalAmount + 40}</span></h4>
                                            : <h4>Total Amount : <span style={{ "color": "#ccc", "fontSize": "25px" }}>₹{totalAmount}</span></h4>
                                        : <h4>Total Amount : <span style={{ "color": "#ccc", "fontSize": "25px" }}>₹{totalAmount}</span></h4>
                                }
                            </h4>
                            {auth?.user?.address ? (
                                <>
                                    <div className="mb-3">
                                        <h4>Current Address : <span style={{ "fontSize": "22px" }}>{auth?.user?.address}</span></h4>
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => navigate("/dashboard/user/profile")}
                                        >
                                            Change Address
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="mb-3">
                                    {auth?.token ? (
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => navigate("/dashboard/user/profile")}
                                        >
                                            Change Address
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() =>
                                                navigate("/login", {
                                                    state: "/cart",
                                                })
                                            }
                                        >
                                            Plase login to checkout
                                        </button>
                                    )}
                                </div>
                            )}
                            <div className="mt-2">
                                {!auth?.token || !cart?.length ? (
                                    ""
                                ) : (
                                    <>
                                        <button
                                            className="btn btn-primary"
                                            onClick={handlePlaceOrder}
                                            disabled={!auth?.user?.address}
                                        >
                                            Place Order
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;