import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Header } from '../components'
import {useStateContext} from '../contexts/ContextProvider'
import { changePassword } from '../controllers/apiController';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const PasswordChange = () => {

    const [data,setData]=useState({oldPassword:"",newPassword:"",confirmPassword:""});
    const {logout,currentColor}=useStateContext();
    const [userType, setUserType] = useState("admin")
    const [disabled,setDisabled]=useState(false);
    const navigate=useNavigate();
    const handleInputChange=(e)=>{setData({...data,[e.target.name]:e.target.value})}

    const handleChange = async ()=>{

            setDisabled(true);

            if(data.oldPassword==="" || data.newPassword==="" || data.confirmPassword=="") { setDisabled(false); return toast.error("Please Enter All fields") }
            if(data.newPassword!==data.confirmPassword) { setDisabled(false); return toast.error("Password Does not match") };

            let resp = await changePassword(sessionStorage.getItem("token"),data,userType);
            if(!resp.success) {setDisabled(false); return toast.error(resp.message); }

            logout();
            navigate("/login")
            toast.success("Log in again");

    }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

       <Header category={"page"} title="Change Password"/>
       <FormControl fullWidth>
       <InputLabel id="demo-simple-select-label">Select User's Type</InputLabel>
       <Select
         labelId="demo-simple-select-label"
         id="demo-simple-select"
         value={userType}
         label="Select User Type"
         onChange={(e)=>setUserType(e.target.value)}
       >
         <MenuItem value={"admin"}>Admin</MenuItem>
         <MenuItem value={"manager"}>Manager</MenuItem>
       </Select>
     </FormControl>
     
       <TextField sx={{width:"100%",marginTop:"30px"}} variant='filled' type="password" value={data.oldPassword} onChange={handleInputChange}  name="oldPassword" label="Old Password"/>
       <TextField sx={{width:"100%",marginTop:"50px"}} type="password" value={data.newPassword}  onChange={handleInputChange} variant='filled' name='newPassword' label="New Password"/>
       <TextField sx={{width:"100%",marginTop:"50px"}} type="password" value={data.confirmPassword} onChange={handleInputChange}  variant='filled' name="confirmPassword" label="Confirm New Password"/>

       <Button disabled={disabled?true:false} variant='contained'  onClick={handleChange} sx={{marginTop:"20px",backgroundColor:currentColor}}>Change</Button>

    </div>
  )
}

export default PasswordChange