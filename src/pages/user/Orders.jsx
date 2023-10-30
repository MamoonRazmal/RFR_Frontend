import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/Buth";
//import Orders from "./Orders";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOders = async () => {
    try {
      const { data } = await axios.get(
        "https://rfr-backend.onrender.com/api/v1/auth/orders"
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOders();
  }, [auth?.token]);
  return (
    <Layout title={"your Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>All oders</h1>
            {orders.map((o, i) => {
              return (
                <div className="border shadow" key={o._id}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="container">
                    {o?.products.map((f, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={f._id}>
                        <div className="col-md-4">
                          <img
                            src={`https://rfr-backend.onrender.com/api/v1/product/product-photo/${f._id}`}
                            className="card-img-top"
                            alt={f.name}
                            width="100px"
                            height={"100px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{f.name}</p>
                          <p>{f.description.substring(0, 30)}</p>
                          <p>Price {f.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
