import Layout from "../components/layout/Layout";
import aboutus from "../assets/aboutus.jpeg";
import React from "react";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img src={aboutus} alt="contactus" style={{ width: "40%" }} />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Welcome To RFR one of the best E-commerce platform in the Mars.we
            are the only online store in Elone Musk city ,we deal with artifical
            scents with the help of our platform you can buy the world most
            famous perfum brands in around galaxies but we only accept payment
            in paypal becuase Elon Mush told us to do .
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
