import { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  const [product, setProduct] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/product/get-product"
      );
      console.log("this is inside product", data.success);
      if (data.success) {
        setProduct(data.products);
        toast.success("got all the product");
        console.log("this is inside product in if statment", data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  console.log("this use state ", product);
  useEffect(() => {
    getAllProducts();
    console.log("this use state and useeffec4t ", product);
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>

          <div className="d-flex flex-wrap">
            {product?.map((p) => (
              <>
                <Link
                  to={`/dashboard/admin/product/${p.slug}`}
                  key={p._id}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`http://localhost:3000/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
