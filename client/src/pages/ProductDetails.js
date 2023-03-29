import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart, setCart] = useCart();

    //initial details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);

    //getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/get-product/${params.slug}`
            );
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        }
        catch (error) {
        }
    };

    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        }
        catch (error) {
        }
    };

    return (
        <Layout>
            <div className="row product-details">
                <div className="product-details-img">
                    <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        className=""
                        alt={product.name}
                        height="300px"
                        width="300px"
                    />
                </div>
                <div className="col-md-6 product-details-info">
                    <h2 className="text-center mt-3" style={{ "color": "#fff" }}>Product Details</h2>
                    <hr />
                    <h6>Name : {product.name}</h6>
                    <h6>Description : {product.description}</h6>
                    <h6>
                        Price : &nbsp;
                        <span style={{ "color": "#1af329" }}>{product?.price?.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                        })}</span>
                    </h6>
                    <h6>Category : {product?.category?.name}</h6>
                    <button
                        className="btn btn-dark ms-1"
                        disabled
                    >
                        Add to cart
                    </button>
                </div>
            </div>
            <hr />
            <div className="row container similar-products">
                <h4 style={{ "color": "#fff" }}>Similar Products ➡️</h4>
                {relatedProducts.length < 1 && (
                    <p className="text-center">Opps! No Similar Products Found.</p>
                )}
                <div className="d-flex flex-wrap">
                    {relatedProducts?.map((p) => (
                        <div className="card m-2" key={p._id}>
                            <img
                                src={`/api/v1/product/product-photo/${p._id}`}
                                className="card-img-top"
                                alt={p.name}
                            />
                            <div className="card-body">
                                <div className="card-name-price">
                                    <h5 className="card-title">{p.name}</h5>
                                    <h5 className="card-title card-price">
                                        {p.price.toLocaleString("en-IN", {
                                            style: "currency",
                                            currency: "INR",
                                        })}
                                    </h5>
                                </div>
                                <p className="card-text ">
                                    {p.description.substring(0, 60)}...
                                </p>
                                <div className="card-name-price">
                                    <button
                                        className="btn btn-info ms-1"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                        More Details
                                    </button>
                                    <button
                                        className="btn btn-dark ms-1"
                                        onClick={() => {
                                            setCart([...cart, p]);
                                            localStorage.setItem(
                                                "cart",
                                                JSON.stringify([...cart, p])
                                            );
                                            alert("Item successfully added to cart");
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;