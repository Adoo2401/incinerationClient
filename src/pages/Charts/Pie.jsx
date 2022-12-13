import React,{useEffect} from 'react';
import { CircularProgress, TextField } from '@mui/material'
import { pieChartData } from '../../data/dummy';
import { ChartsHeader, Pie as PieChart } from '../../components';
import { getPieData } from '../../controllers/apiController';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useStateContext } from '../../contexts/ContextProvider';

const Pie = () => {
  let token=sessionStorage.getItem("token");
  const [date,setDate]=useState("")
  const [data,setData]=useState([])
  const [loader,setLoader]=useState(false)
  const { currentColor} = useStateContext();

  useEffect(async()=>{
    
    if(date!==''){
      setLoader(true)
      let resp=await getPieData(token,date)
    if(resp.message!='Incomplete'){
      setData(resp.message)
      return setLoader(false)
    }

    if(resp.message==='Incomplete'){
      toast.warn("Incomplete Data")
    }

    }

  },[date])

  return(<div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <ChartsHeader category="Pie" title="Non-Operational Timing" />
    <TextField id="standard-basic" onChange={(e)=>setDate(e.target.value)} name='date' required  type='date' label="Date" variant="standard" />
    {loader?<div style={{height:"100%",width:"100%",display:'flex',justifyContent:"center"}}>
        <CircularProgress sx={{color:currentColor}}/>
    </div>:<div className="w-full">
      <PieChart id="chart-pie" data={data} legendVisiblity height="full" />
    </div>}
  </div>)

}
;

export default Pie;
