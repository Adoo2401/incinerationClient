import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Header } from '../components'
import {useStateContext} from '../contexts/ContextProvider'
import { changePassword } from '../controllers/apiController';

const PasswordChange = () => {

    const [data,setData]=useState({oldPassword:"",newPassword:"",confirmPassword:""});
    const {logout}=useStateContext();
    const [disabled,setDisabled]=useState(false);
    const navigate=useNavigate();
    const handleInputChange=(e)=>{setData({...data,[e.target.name]:e.target.value})}

    const handleChange = async ()=>{

            setDisabled(true);

            if(data.oldPassword==="" || data.newPassword==="" || data.confirmPassword=="") { setDisabled(false); return toast.error("Please Enter All fields") }
            if(data.newPassword!==data.confirmPassword) { setDisabled(false); return toast.error("Password Does not match") };

            let resp = await changePassword(sessionStorage.getItem("token"),data);
            if(!resp.success) {setDisabled(false); return toast.error(resp.message); }

            logout();
            navigate("/login")
            toast.success("Log in again");

    }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

       <Header category={"page"} title="Change Password"/>
       <TextField sx={{width:"100%"}} variant='filled' type="password" value={data.oldPassword} onChange={handleInputChange}  name="oldPassword" label="Old Password"/>
       <TextField sx={{width:"100%",marginTop:"50px"}} type="password" value={data.newPassword}  onChange={handleInputChange} variant='filled' name='newPassword' label="New Password"/>
       <TextField sx={{width:"100%",marginTop:"50px"}} type="password" value={data.confirmPassword} onChange={handleInputChange}  variant='filled' name="confirmPassword" label="Confirm New Password"/>

       <Button disabled={disabled?true:false} variant='contained' color="success" onClick={handleChange} sx={{marginTop:"20px"}}>Change</Button>

    </div>
  )
}

export default PasswordChange