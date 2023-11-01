import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";
const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://rfr-backend.onrender.com/api/v1/product/get-product/${params.slug}`
      );

      setProduct(data?.singleProduct);

      setCategory(data?.singleProduct.category);
      console.log("categorydddd", data.singleProduct.category._id);
      getSimiliarProducts(
        data?.singleProduct._id,
        data?.singleProduct.category._id
      );
      console.log("this is inside of category", category);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimiliarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://rfr-backend.onrender.com/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {/* <h1 className="similar-products">Product Details</h1> */}
      <div className="row container product-details"></div>
      <div className="row container mt-2">
        <div className="col-md-6 ">
          <img
            src={`https://rfr-backend.onrender.com/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>

          <h6>{product.name}</h6>
          <hr />
          {/* <h6>Description:{product.description}</h6> */}
          {/* {JSON.stringify(product, null, 4)} */}
          {/* <h6>Category:{category.name}</h6> */}

          <h6>{product.price}€</h6>
          <hr />
          <button
            className="btn btn-success ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, p]));
              toast.success("Item Added to cart");
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
      <div className="row container border-none" style={{ padding: "10px" }}>
        <hr />

        <div className="mb-3 border-none" style={{ padding: "10px" }}>
          <li
            className="nav-item dropdown border-none m-8  "
            aria-expanded="false"
          >
            <Link
              className="nav-link dropdown-toggle"
              to={"/categories"}
              data-bs-toggle="dropdown"
            >
              Description
            </Link>
            <ul
              className="dropdown-menu help mb-3  "
              style={{ padding: "10px" }}
            >
              <li
                className="dropdown-item text-wrap mb-3"
                style={{ margin: "2px 0" }}
              >
                {product.description}
              </li>
            </ul>
            <hr />
          </li>
        </div>
        <h6 className="mt-5">Similar products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className=" d-flex flex-wrap">
          {relatedProducts?.map((p) => (
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
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondory ms-1"
                    onClick={() => {
                      setCart([...cart, product]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, product])
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
    </Layout>
  );
};

export default ProductDetails;
