import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);

    //getall products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product`);
            setProducts(data.products);
        } catch (error) {
            alert("Something Went Wrong");
        }
    };

    //lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout title={"All Products - Admin"}>
            <div className="row dashboard">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9 ">
                    <h2 className="text-center mt-3 all-products">All Products</h2>
                    <div className="d-flex flex-wrap admin-all-product">
                        {products?.map((p) => (
                            <Link
                                key={p._id}
                                to={`/dashboard/admin/product/${p.slug}`}
                                className="product-link"
                            >
                                <div className="card m-2" style={{ width: "18rem" }}>
                                    <img
                                        src={`/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 120)}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products;