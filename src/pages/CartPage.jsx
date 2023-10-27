import React from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Buth";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((e) => {
        total = total + e.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let mycart = [...cart];
      let index = mycart.findIndex((item) => item._id === pid);
      mycart.splice(index, 1);
      setCart(mycart);
      localStorage.setItem("cart", JSON.stringify(mycart));
    } catch (error) {
      console.log(error);
    }
  };
  console.log("auth data", auth);
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.user}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please login to checkout"
                  }`
                : "Your cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">Cart Item</div>
          {cart.map((f) => (
            <div className="row mb-2 p-3 card flex-row" key={f._id}>
              <div className="col-md-4">
                <img
                  src={`http://localhost:3000/api/v1/product/product-photo/${f._id}`}
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
                <button
                  className="btn btn-danger"
                  onClick={() => removeCartItem(f._id)}
                >
                  remove
                </button>
              </div>
            </div>
          ))}
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total |CheckOut |payment</p>
            <h4>Total :{totalPrice()}</h4>
            <hr />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
