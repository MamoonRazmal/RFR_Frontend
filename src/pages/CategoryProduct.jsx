import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import { Hourglass } from "react-loader-spinner";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";
const CategoryProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useCart();
  const [loading, SetLoading] = useState(false);
  const getProduct = async () => {
    SetLoading(true);
    const { data } = await axios.get(
      `https://rfr-backend.onrender.com/api/v1/product/product-category/${params.slug}`
    );
    setProducts(data?.products);
    setCategories(data?.category);
    SetLoading(false);
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params.slug]);
  //console.log("value of products and  cat", products[0]._id);

  return (
    <Layout>
      <div className="container mt-3 category">
        {loading ? (
          <div className="loader">
            <Hourglass
              visible={true}
              position="center"
              height="80"
              width="80"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#306cce", "#72a1ed"]}
            />
          </div>
        ) : (
          <>
            <h4 className="text-center">Category -{categories?.name}</h4>
            <h6 className="text-center">{products?.length} result found</h6>
            <div className="row">
              <div className="d-flex flex-wrap" key={products._id}>
                {products?.map((p) => (
                  <>
                    <div className="card m-2">
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
              {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btun btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}
          </div> */}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
