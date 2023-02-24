import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { Helmet } from "react-helmet";

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <div className='main'>
                {children}
            </div>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: "Storepify Shopping App",
    description: "Shop your favourite products on Storepify",
    keywords: "MERN, React, Node, MongoDB",
    author: "Ritik Kumar",
};

export default Layout;