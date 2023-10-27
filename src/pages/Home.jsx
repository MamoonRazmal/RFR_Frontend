import Layout from "../components/layout/Layout";
import { useAuth } from "../context/Buth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/Cart";
const Home = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [products, setproducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get

  const getallCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/category/get-category"
      );

      if (data?.success) {
        console.log(data?.category);
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/product/product-list/${page}`
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
        "http://localhost:3000/api/v1/product/product-count"
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
        `http://localhost:3000/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setproducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getTotal();
  }, []);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/product/product-filter",
        { checked, radio }
      );
      setproducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getallCategory();

    getAllProduct();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
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
    <Layout title={"All Products=Besr offers"}>
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center"> Filer By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center"> Filer By Price</h4>
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
              Rest Filter
            </button>
          </div>
        </div>

        <div className="col-md-9">
          {JSON.stringify(radio, null, 4)}

          <h6 className="text-center">All products</h6>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <>
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:3000/api/v1/product/product-photo/${p._id}`}
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
                className="btun btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
