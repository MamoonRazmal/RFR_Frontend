import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu';
import { useAuth } from '../../context/Buth';
const Dashboard = () => {
  const[auth]=useAuth()
  return (
    <Layout title={"Dashboard -RFR"}>
      <div className="container-fluid m-3 p-3">
        <div className="row"></div>
        <div className="col-md-3">
          <UserMenu/>
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
              <h3>{auth?.user?.user}</h3>
              <h3>{auth?.user?.email}</h3>
              <h3>{auth?.user?.address}</h3>
          </div>
         
       
        </div>
      </div>
      
    </Layout>
  )
}

export default Dashboard
