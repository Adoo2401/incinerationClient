import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'


const Protect = () => {

    let auth=JSON.parse(sessionStorage.getItem("user"));
  
  return (
    <>
    {auth?.role=="admin" || auth?.role==='manager'?<Outlet/>:<Navigate to={"/login"}/>}
    </>
  )
}

export default Protect