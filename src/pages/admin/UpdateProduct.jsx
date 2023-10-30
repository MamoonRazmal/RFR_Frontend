import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;
const UpdateProduct = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [slug, setSlug] = useState([]);
  const params = useParams();

  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  const [price, setPrice] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [shipping, setShipping] = useState([]);
  const [id, setId] = useState("");
  ////// get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://rfr-backend.onrender.com/api/v1/product/get-product/${params.slug}`
      );

      setId(data.singleProduct._id);
      setName(data.singleProduct.name);
      setDescription(data.singleProduct.description);
      setPrice(data.singleProduct.price);
      setQuantity(data.singleProduct.quantity);
      setCategory(data.singleProduct.category._id);
      setShipping(data.singleProduct.shipping);
      console.log("this data inside", data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    console.log("in useEffect", name);
    //eslint-disable-next-line
  }, []);

  const getallCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://rfr-backend.onrender.com/api/v1/category/get-category"
      );

      if (data?.success) {
        console.log(data.category);
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);

      const { data } = axios.put(
        `https://rfr-backend.onrender.com/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("product Updated successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    getallCategory();
    getSingleProduct();
  }, []);

  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure want to delete this Product?");
      if (!answer) return;
      const { data } = await axios.delete(
        `https://rfr-backend.onrender.com/api/v1/product/delete-product/${id}`
      );
      toast.success("product Deleted Successfuly");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("some thing went wrong");
    }
  };

  return (
    <Layout title={"Dashboard -Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update product</h1>
            <div className="m-1">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {" "}
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary">
                  {photo ? photo.name : "Upload photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product Photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`https://rfr-backend.onrender.com/api/v1/product/product-photo/${id}`}
                      alt="Product Photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(f) => setName(f.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="Write the description"
                  className="form-control"
                  onChange={(f) => setDescription(f.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={price}
                  placeholder="Write a price"
                  className="form-control"
                  onChange={(f) => setPrice(f.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={quantity}
                  placeholder="Write a qty"
                  className="form-control"
                  onChange={(f) => setQuantity(f.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select a shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "yes" : "No"}
                >
                  test
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  {" "}
                  Update PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  {" "}
                  Delete PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
        /
      </div>
    </Layout>
  );
};

export default UpdateProduct;
