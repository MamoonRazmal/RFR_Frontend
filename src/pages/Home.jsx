import Layout from "../components/layout/Layout";
import { useAuth } from "../context/Buth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/Cart";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Slides from "../components/Slides";
import Toast from "react-bootstrap/Toast";
import Canvas from "../components/layout/Canvas";
import { AiOutlineReload } from "react-icons/ai";
import Snowfall from "react-snowfall";

import "../styles/Homepage.css";
import diamond from "../assets/mainherosection.webp";
import { Hourglass } from "react-loader-spinner";

const Home = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const [products, setproducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState("All Products");
  const [filtercount, setFilterCount] = useState(0);

  //get

  const getallCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://rfr-backend.onrender.com/api/v1/category/get-category"
      );

      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getallCategory();
    getTotal();
  }, []);
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://rfr-backend.onrender.com/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setproducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("some thing went wrong");
    }
  };
  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "https://rfr-backend.onrender.com/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  //load more
  useEffect(() => {
    if (page == 1) return;
    loadMore();
  }, [page]);
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://rfr-backend.onrender.com/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setproducts([...products, ...data?.products]);
      setFilterCount(filtercount + data.products.length);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "https://rfr-backend.onrender.com/api/v1/product/product-filter",
        { checked, radio }
      );
      // console.log("value of data and product,", data?.products);
      setFilterCount(data?.products.length);
      if (data?.products.length === 0) setWarning("No Product found");
      else setWarning("Products Found");

      setproducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProduct();
    setFilterCount(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, radio]);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }

    setChecked(all);
  };

  return (
    <>
      <Layout title={"All Products=Best offers"}>
        {loading ? (
          <div className="loader-container">
            <div className="spinner">
              <Hourglass
                visible={true}
                position="center"
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={["#000000", "#C2B280"]}
              />
            </div>
          </div>
        ) : (
          <>
            <Slides></Slides>
            <div className="container-fluid row mt-3 home-page">
              <div></div>
              <div></div>
              <div className="col-md-3 filters">
                <h4 className="text-center"> Filter By Categories</h4>
                <div className="d-flex flex-column">
                  {categories?.map((c) => (
                    <>
                      <Checkbox
                        key={c._id}
                        checked={checked.includes(c._id)}
                        onChange={(e) => handleFilter(e.target.checked, c._id)}
                        value={true}
                      >
                        {c.name}
                      </Checkbox>
                    </>
                  ))}
                </div>
                <h4 className="text-center"> Filter By Price</h4>
                <div className="d-flex flex-column">
                  <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                    {Prices?.map((k) => (
                      <div key={k._id}>
                        {" "}
                        <Radio value={k.array}>{k.name}</Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
                <div className="d-flex flex-column">
                  <button
                    className="btn btn-danger"
                    onClick={() => window.location.reload()}
                  >
                    Reset Filter
                  </button>
                </div>
              </div>

              <div className="col-md-9">
                <h6 className="text-center">
                  {filtercount === 0 ? warning : warning + " " + filtercount}
                </h6>
                <div className="d-flex flex-wrap">
                  {products?.map((p) => (
                    <>
                      <div className="card m-2" style={{ width: "18rem" }}>
                        <img
                          src={`https://rfr-backend.onrender.com/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                        />
                        <div className="card-body">
                          <div className="card-name-price">
                            <h5 className="card-title">{p.name}</h5>
                            <h5 className="card-title card-price">
                              {p.price.toLocaleString("de-DE", {
                                style: "currency",
                                currency: "EUR",
                              })}
                            </h5>
                          </div>

                          <p className="card-text">
                            {p.description.substring(0, 30)}....
                          </p>
                          {/* <p className="card-text">€{p.price}</p> */}
                          <button
                            className="btn btn-info ms-1"
                            onClick={() => navigate(`/product/${p.slug}`)}
                          >
                            More Details
                          </button>
                          <button
                            className="btn btn-dark ms-1"
                            onClick={() => {
                              setCart([...cart, p]);
                              localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, p])
                              );
                              toast.success("Item added to cart");
                            }}
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <div className="m-2 p-3">
                  {products && products.length < total && (
                    <button
                      className="btn loadmore"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page + 1);
                      }}
                    >
                      {loading ? (
                        "Loading..."
                      ) : (
                        <>
                          {" "}
                          Loadmore <AiOutlineReload />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* <div className="m-2 p-3">
                  {products && products.length < total && (
                    <button
                      className="btn btn-warning"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page - 1);
                      }}
                    >
                      {loading ? "Loading..." : "Goback"}
                    </button>
                  )}
                </div> */}
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default Home;
