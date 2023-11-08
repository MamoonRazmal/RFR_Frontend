import React, { useEffect, useState } from "react";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/Buth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Profile = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { email, name, phone, address } = auth.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      //const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address})
      const { data } = await axios.put(
        "https://rfr-backend.onrender.com/api/v1/auth/profile",
        { name, email, password, phone, address }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updateUser });
        let ps = localStorage.getItem("auth");
        ps = JSON.parse(ps);
        ps.user = data.updateUser;
        localStorage.setItem("auth", JSON.stringify(ps));
        toast.success("profile updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("some thing went wrong");
    }
  };
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div>
              <form onSubmit={handlesubmit}>
                <h4 className="title">User Profile</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputNames"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputNamed"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
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
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputNamek"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputNameq"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
