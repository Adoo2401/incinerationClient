import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import BacklogLocations from "./BacklogLocations";

const DashboardList = ({ data,ind }) => {

  let colors=["#301934","#000000","#023020","#343434","#191970"]
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
      <Paper elevation={10} style={data.date==="Till Date - In Progress"?{cursor:"pointer"}:{}} onClick={data.date=="Till Date - In Progress"?handleClickOpen:null}>
      <h1 style={{textAlign:"center",margin:'20px',fontSize:'30px',fontWeight:'900',backgroundColor:colors[ind],color:"white"}}>{data.date}</h1>
      <div style={{display:"flex",justifyContent:"space-around",margin:"60px"}}>
       <h2 style={{color:"#000039",fontWeight:500,fontSize:'20px'}}>{data.date==="Till Date - In Progress"?'In Proccess':'Collected'}</h2>
        <p style={{fontSize:"22px",fontWeight:600}}>
          {data.collected.toLocaleString("en-US", {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          })}
        </p>
      </div>
      {data.date!=="Till Date - In Progress" &&<div style={{display:"flex",justifyContent:"space-around",margin:"60px"}}>
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
    {data.date==="Till Date - In Progress" &&<BacklogLocations open={open} setOpen={setOpen} handleClose={handleClose}/>}
  </>
  );
};

export default DashboardList;
