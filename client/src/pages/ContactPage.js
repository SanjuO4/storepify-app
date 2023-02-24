import React from 'react';
import Layout from '../components/Layout/Layout';
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const ContactPage = () => {
    return (
        <Layout title={"Contact Us - Storepify"}>
            <div className="row contactus">
                <div className="col-md-6 contact-img">
                    <img
                        src="/images/contactus.jpg"
                        alt="contactus"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4 contact-desc">
                    <h2 className="text-center" style={{ "color": "#fff" }}>Storepify Help Center</h2>
                    <p className="text-justify mt-2" style={{ "color": "#ccc" }}>
                        For any query about your recent orders and issues feel free to call anytime we 24X7
                        vaialible.
                    </p>
                    <p className="mt-3">
                        <BiMailSend style={{ "color": "#fff" }} /> : contact@storepify.com
                    </p>
                    <p className="mt-3">
                        <BiPhoneCall style={{ "color": "#fff" }} /> : +919876543210
                    </p>
                    <p className="mt-3">
                        <BiSupport style={{ "color": "#fff" }} /> : 1800-0000-0000 (toll free)
                    </p>
                </div>
            </div>
        </Layout >
    )
}

export default ContactPage;