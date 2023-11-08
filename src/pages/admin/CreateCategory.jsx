import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";
import CategoryForm from "../../components/form/CategoryForm";
const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://rfr-backend.onrender.com/api/v1/category/create-category",
        { name }
      );
      if (data?.success) {
        toast.success(`${data.name} is created`);
        getallCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form");
    }
  };

  const getallCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://rfr-backend.onrender.com/api/v1/category/get-category"
      );

      if (data?.success) {
        console.log(data?.category);
        setCategory(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    getallCategory();
  }, []);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://rfr-backend.onrender.com/api/v1/category/update-category/${selected._id}`,
        { name: updateName }
      );
      console.log("data bavlue is ", data.success);
      if (data.success) {
        toast.success(`${updateName} is Updated`);
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getallCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("someting went wrong");
    }
  };

  //delete category
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `https://rfr-backend.onrender.com/api/v1/category/delete-category/${pid}`,
        { name: updateName }
      );
      console.log("data bavlue is ", data.success);
      if (data.success) {
        toast.success(`Category is Deleted`);

        getallCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("someting went wrong");
    }
  };
  /////

  return (
    <Layout title={"Dashboard -Create Category"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>

            <div>
              <div className="w-75">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category?.map((e) => (
                      <>
                        <tr>
                          <td key={e._id}>{e.name} </td>
                          <td>
                            <button
                              className="btn btn-primary ms-2"
                              onClick={() => {
                                setVisible(true);
                                setUpdateName(e.name);
                                setSelected(e);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger ms-2"
                              onClick={() => {
                                handleDelete(e._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
              <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                open={visible}
              >
                <CategoryForm
                  value={updateName}
                  setValue={setUpdateName}
                  handleSubmit={handleUpdate}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
