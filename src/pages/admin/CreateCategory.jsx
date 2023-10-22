import {useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
const CreateCategory = () => {
  const[category,setCategory]=useState([])
  const getallCategory=async()=>{
    try{
const {data} = await axios.get('http://localhost:3000/api/v1/category/get-category')
if(data.success){
  console.log(data.category)
  setCategory(data.category)

}

    }
    catch(error){
      console.log(error)
      toast.error("something went wrong")
    }
  }
  useEffect(()=>{
    getallCategory()

  },[])
  return (
    <Layout title={"Dashboard -Create Category"}>
      <div className='container-fluid m-3 p-3'>
      <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
            <h1>Manage Category</h1>
            <div>

          <table className="table">
  <thead>
    <tr>
     
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    {category.map(e=>(
      <td key={e._id}>{e.name} </td>
    ))}
  </tr>
    
  </tbody>
</table>







            </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default CreateCategory
