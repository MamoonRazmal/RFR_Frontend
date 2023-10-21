
import { useState,useEffect } from 'react'
import { useAuth } from '../../context/Buth'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Spinner';
export default function AdminRoute(){
    const[ok,setOk]=useState(false)
    const[auth,setAuth]=useAuth()
    useEffect(()=>{
        const authcheck=async()=>{
            const res= await axios.get('http://localhost:3000/api/v1/auth/admin-auth',{
                headers:{
                    "Authorization":auth?.token
                }
            })
            if(res.data.ok){
                setOk(true)
            }
            else{
                setOk(false)
            }}
            if(auth?.token)authcheck()},[auth?.token])
            return ok ? <Outlet/> :<Spinner path=''/>}

