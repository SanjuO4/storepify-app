import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";

const SearchProduct = () => {
    const [values, setValues] = useSearch();

    return (
        <Layout title={"Search results"}>
            <div className="container">
                <div className="text-center">
                    <div>
                        <h2 className="mt-3" style={{ "color": "#fff" }}>Search Results</h2>
                        <h6 style={{ "color": "#ccc" }}>
                            {values?.results.length < 1
                                ? "No Products Found"
                                : `${values?.results.length} Products Found`}
                        </h6>
                    </div>
                    <div className="serach-product-cont mt-4">
                        {values?.results.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">
                                        {p.description.substring(0, 30)}...
                                    </p>
                                    <p className="card-text"> ₹{p.price}.00</p>
                                    <button className="btn btn-primary search-product-btn">More Details</button>
                                    <button className="btn btn-secondary search-product-btn">Add to Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SearchProduct;