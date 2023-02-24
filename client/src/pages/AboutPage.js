import React from 'react';
import Layout from '../components/Layout/Layout';

const AboutPage = () => {
    return (
        <Layout title={"About Us - Storepify"}>
            <div className="row aboutus">
                <div className="col-md-6 about-img">
                    <img
                        src="/images/about.jpeg"
                        alt="contactus"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4 about-desc-cont">
                    <h2 className='mt-4 about-title'>Mission</h2>
                    <p className="text-justify mt-1 about-desc">
                        To make it easy to do business anywhere.
                    </p>
                    <h2 className='about-title'>Vision</h2>
                    <p className="text-justify mt-1 about-desc">
                        We aspire to be a good company that will last for 102 years.
                        We envision that our customers will meet, work and live at Storepify.
                        Our vision for fiscal year 2036 is to serve 2 billion global consumers,
                        enable 10 million businesses to be profitable and create 100 million jobs.
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default AboutPage;