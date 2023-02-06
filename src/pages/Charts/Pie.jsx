import React,{useEffect} from 'react';
import { CircularProgress, TextField } from '@mui/material'

import { ChartsHeader, Pie as PieChart } from '../../components';
import { getPieData } from '../../controllers/apiController';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useStateContext } from '../../contexts/ContextProvider';

const Pie = ({dateProp,to,select}) => {
  let token=sessionStorage.getItem("token");
  const [data,setData]=useState([])
  const [loader,setLoader]=useState(false)
  const { currentColor} = useStateContext();

  useEffect(async()=>{

    
    if(dateProp!=='' && to!=""){
      setLoader(true)
      let resp=await getPieData(token,dateProp,to,select)

    if(resp.success){
      setData(resp.message)
      return setLoader(false)
    }

  
    }

  },[dateProp,to,select])

  return(<div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl" style={{width:'40%'}}>
    <ChartsHeader category="Pie" title="Non-Operational Timing" />
    {loader?<div style={{height:"100%",width:"100%",display:'flex',justifyContent:"center"}}>
        <CircularProgress sx={{color:currentColor}}/>
    </div>:<div  className="w-full">
      <PieChart  id="chart-pie" data={data} legendVisiblity height="full" />
    </div>}
  </div>)

}
;

export default Pie;
