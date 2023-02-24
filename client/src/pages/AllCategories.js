import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import useCategory from './../Hooks/useCategory';

const AllCategories = () => {
    const categories = useCategory();

    return (
        <Layout title={"All Categories"}>
            <h2 className="text-center all-cats">All Categories</h2>
            <div className="container" style={{ marginTop: "20px" }}>
                <div className="row container">
                    {categories.map((c) => (
                        <div className="col-md-4 mb-3 gx-3 gy-3" key={c._id}>
                            <div className="card all-cats-item">
                                <Link to={`/category/${c.slug}`} className="btn cat-btn">
                                    {c.name}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default AllCategories;