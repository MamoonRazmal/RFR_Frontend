import React from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/Cart";
import { useSearch } from "../context/Search";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const navigate = useNavigate();
  const [values, setValue] = useSearch();
  const [cart, setCart] = useCart();
  return (
    <Layout title={"search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search result</h1>
          <h6>
            {values?.results.length < 1
              ? "No product found"
              : `Found ${values?.results.length}`}
          </h6>

          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <>
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`https://rfr-backend.onrender.com/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}....
                    </p>
                    <p className="card-text">€{p.price}</p>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondory ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
