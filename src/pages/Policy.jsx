import React from "react";
import Layout from "./../components/Layout/Layout";
import policy from "../assets/policy.jpeg";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img src={policy} alt="contactus" style={{ width: "40%" }} />
        </div>
        <div className="col-md-4">
          <p>Please donot try this at home</p>
          <p>this website is made by professionals</p>
          <p>All pictures and items are copied </p>
          <p>This Plateform is used for educational purpose only</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
