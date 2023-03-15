import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import baseURL from "../baseURL";
import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ResetPassword = () => {
  const [data, setData] = useState({ newPassword: "", confirmPassword: "" });
  const { logout, currentColor } = useStateContext();
  const { uuid } = useParams();
  const [disabled, setDisabled] = useState(false);
  const [userType, setUserType] = useState("admin")
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChange = async () => {
    setDisabled(true);

    try {
      if (data.newPassword === "" || data.confirmPassword == "") {
        setDisabled(false);
        return toast.error("Please Enter All fields");
      }
      if (data.newPassword !== data.confirmPassword) {
        setDisabled(false);
        return toast.error("Password Does not match");
      }

      let API = await fetch(`${baseURL}/resetPassword/${uuid}?type=${userType}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: data.confirmPassword }),
      });
      API = await API.json();

      if (API.success) {
        toast.success("Password Reset Successfully");
        navigate("/login");
      }else{
        toast.error(API.message);
        setDisabled(false);
      }


    } catch (error) {
      setDisabled(false)
      toast.error(error.message);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={"page"} title="Rest Password" />
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

      <TextField
        sx={{ width: "100%", marginTop: "50px" }}
        type="password"
        value={data.newPassword}
        onChange={handleInputChange}
        variant="filled"
        name="newPassword"
        label="New Password"
      />
      <TextField
        sx={{ width: "100%", marginTop: "50px" }}
        type="password"
        value={data.confirmPassword}
        onChange={handleInputChange}
        variant="filled"
        name="confirmPassword"
        label="Confirm New Password"
      />

      <Button
        disabled={disabled ? true : false}
        variant="contained"
        onClick={handleChange}
        sx={{ marginTop: "20px", backgroundColor: currentColor }}
      >
        Reset
      </Button>
    </div>
  );
};

export default ResetPassword;
