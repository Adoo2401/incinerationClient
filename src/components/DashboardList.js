import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import BacklogLocations from "./BacklogLocations";

const DashboardList = ({ data,ind }) => {

  const {currentColor} = useStateContext()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  return (
  <>
    <Box sx={{display: 'flex',flexWrap: 'wrap','& > :not(style)': {  m: 1,  width: 408,  height: 328,},margin:'10px 0'}}>
      <Paper elevation={10} style={data.date==="In Process"?{cursor:"pointer"}:{}} onClick={data.date=="In Process"?handleClickOpen:null}>
      <h1 style={{textAlign:"center",margin:'20px',fontSize:'30px',fontWeight:'900',backgroundColor:currentColor,color:"white"}}>{data.date}</h1>
      <div style={{display:"flex",justifyContent:"space-around",margin:"60px"}}>
       <h2 style={{color:"#000039",fontWeight:500,fontSize:'20px'}}>{data.date==="In Process"?'In Proccess':'Collected'}</h2>
        <p style={{fontSize:"22px",fontWeight:600}}>
          {data.collected.toLocaleString("en-US", {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          })}
        </p>
      </div>
      {data.date!=="In Process" &&<div style={{display:"flex",justifyContent:"space-around",margin:"60px"}}>
        <h2 style={{color:"#000039",fontWeight:500,fontSize:'20px'}}>Incinerated</h2>
        <p style={{fontSize:"22px",fontWeight:600}}>
          {data.incinerated.toLocaleString("en-US", {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          })}
        </p>
      </div>}
      </Paper>
    </Box>
    {data.date==="In Process" &&<BacklogLocations open={open} setOpen={setOpen} handleClose={handleClose}/>}
  </>
  );
};

export default DashboardList;
