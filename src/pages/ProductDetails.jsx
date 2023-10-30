import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
const ProductDetails = () => {
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
      <h1>Product Details</h1>
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

          <h6>Name:{product.name}</h6>
          <h6>Description:{product.description}</h6>
          {/* {JSON.stringify(product, null, 4)} */}
          {/* <h6>Category:{category.name}</h6> */}

          <h6>Price:{product.price}</h6>
          <button className="btn btn-secondory ms-1">Add To Cart</button>
        </div>
      </div>
      <div className="row container">
        <hr />
        <h6>similar product</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}

        <div className="d-flex flex-wrap">
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

                  <button className="btn btn-secondory ms-1">
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
