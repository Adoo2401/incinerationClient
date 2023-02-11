import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { Header } from "../components";
import DashboardLine from "../components/Charts/DashboardLine";
import DashboardList from "../components/DashboardList";
import { useStateContext } from "../contexts/ContextProvider";
import { dashboard } from "../controllers/apiController";

const Dashboard = () => {
  const { currentColor, currentMode } = useStateContext();
  const [loader,setLoader]=useState(true);
  const token=sessionStorage.getItem("token");
  

  const [data, setData] = useState([]);

  useEffect(async()=>{
    
    let resp=await dashboard(token);
    if(resp){
      setData(resp.message)
      setLoader(false)
    }else{
      toast.error("Something Went Wrong")
    }
  },[])

  return (
   <>
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="Page" title="Dashboard" />
      <div className="w-full">
        <div className="dashboard__container">
          {loader ? (
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress sx={{color:currentColor}} />
            </div>
          ) : (
            data.map((elm, ind) => <DashboardList key={ind} ind={ind} data={elm} />)
          )}
        </div>
      </div>
       <DashboardLine/>
    </div>
   </>
  );
};

export default Dashboard;
