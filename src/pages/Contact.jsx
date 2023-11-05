import React from "react";
import Layout from "./../components/layout/Layout";
import contact from "../assets/contact_us.jpeg";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img src={contact} alt="contactus" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@rfr.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 010-5555-5555
          </p>
          <p className="mt-3">
            <BiSupport /> : 9999-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
