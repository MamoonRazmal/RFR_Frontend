import Layout from "../../components/layout/Layout";

import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const location = useLocation();

  const navigate = new useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      //const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address})
      const res = await axios.post(
        `https://rfr-backend.onrender.com/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
      );
      if (res.data.message) {
        toast.success(res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("some thing went wrong");
    }
  };
  return (
    <Layout title={"Forgot Password"}>
      <div className="form-container">
        {" "}
        <h1>Reset Password</h1>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputNamed"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputNameds"
              placeholder="Enter your favoure Food"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="NewPassword"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Reset
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
