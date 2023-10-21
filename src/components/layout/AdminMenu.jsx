import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <>
    <div className="text-center">
    <div className="list-group">
  <h4>Admin Panel</h4>
  <NavLink to="" className="list-group-item list-group-item-action">Create Category</NavLink>
  <NavLink to="" className="list-group-item list-group-item-action">Create Product</NavLink>
  <NavLink to="" className="list-group-item list-group-item-action">User</NavLink>
  <NavLink className="list-group-item list-group-item-action disabled" aria-disabled="true">A disabled link item</NavLink>
</div>
    </div>


      
    </>
  )
}

export default AdminMenu
