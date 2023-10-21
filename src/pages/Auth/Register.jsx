
import Layout from '../../components/layout/Layout'
import { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios'
import {useNavigate}from 'react-router-dom'

const Register = () => {
  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[phone,setPhone]=useState("")
  const[answer,setAnswer]=useState("")
  const[address,setAddress]=useState("")
  
  const navigate=new useNavigate()
  const handlesubmit=async (e)=>{
    e.preventDefault();
    try{
     
      //const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address})
      const res=await axios.post(`http://localhost:3000/api/v1/auth/register`,{name,email,password,phone,address,answer})
      if(res&& res.data.success){
        toast.success(res.data.message)
        navigate('/login')

      }
      else{
        toast.error(res.data.message)
      }
    }
    catch(error){
      console.log(error)
      toast.error("some thing went wrong")

    }
  }
  return (
    <Layout title={"Register -RFR"}>
     <div className="form-container"> <h1>Register Page</h1> 
     <form onSubmit={handlesubmit}>
  <div className="mb-3">
    
    <input type="text" className="form-control" id="exampleInputNames" placeholder='Name' value={name}  onChange={(e)=>setName(e.target.value)} required/>
   
  </div>
  <div className="mb-3">
  
    <input type="email" className="form-control" id="exampleInputNamed" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
   
  </div>
  <div className="mb-3">
    
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
  </div>
  <div className="mb-3">
   
    <input type="text" className="form-control" id="exampleInputNamek" placeholder='Phone'value={phone} onChange={(e)=>setPhone(e.target.value)} required />
   
  </div>
  <div className="mb-3">
   
    <input type="text" className="form-control" id="exampleInputNameq" placeholder='Address'value={address} onChange={(e)=>setAddress(e.target.value)} required />
   
  </div>
  <div className="mb-3">
   
    <input type="text" className="form-control" id="exampleInputNameq" placeholder='What is your favourite food'value={answer} onChange={(e)=>setAnswer(e.target.value)} required />
   
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>


     
     </div>
    </Layout>
  )
}

export default Register
