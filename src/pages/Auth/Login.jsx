import Layout from "../../components/layout/Layout";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/Buth";
import "../../styles/AuthStyles.css";
import { RotatingLines } from "react-loader-spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = new useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      //const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address})
      const res = await axios.post(
        " https://rfr-backend.onrender.com/api/v1/auth/login",
        { email, password }
      );
      console.log("value of resssssssss,", res.data);
      if (res && res.data.sucess) {
        // toast.success("res && res.data.message");
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        // console.log(res.data.success);
        navigate(location.state || "/");
        setLoading(false);
      } else {
        toast.error(res.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("some thing went wrong");
      setLoading(false);
    }
  };
  return (
    <Layout title={"Login Form"}>
      <div className="form-container">
        {" "}
        <h1>Login Page</h1>
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
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot password
            </button>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              {loading ? (
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="30"
                  visible={true}
                />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
