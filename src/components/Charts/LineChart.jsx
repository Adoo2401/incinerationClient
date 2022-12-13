import React, { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DateTime, Legend, Tooltip,ColumnSeries ,LineSeries, Category} from '@syncfusion/ej2-react-charts';

import {LinePrimaryXAxis, LinePrimaryYAxis } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';
import { CircularProgress, TextField } from '@mui/material';
import { getLineData } from '../../controllers/apiController';

const LineChart = () => {
  const { currentMode,currentColor } = useStateContext();
  let token=sessionStorage.getItem("token");
  let [data,setData]=useState([])
  let [loader,setLoader]=useState(false)
  let [date,setDate]=useState("")

  useEffect(async()=>{

    if(date!==''){
      setLoader(true)
      let resp=await getLineData(token,date)
    if(resp){
      setData(resp.message)
      return setLoader(false)
    }
    }

  },[date])

   const lineCustomSeries = data.length>0?[
    { dataSource:data[0],
      xName: 'x',
      yName: 'y',
      name: 'Bags Weight',
      width: '2',
      marker: { visible: true, width: 10, height: 10 },
      type: 'Line' },
  
    { dataSource:data[1],
      xName: 'x',
      yName: 'y',
      name: 'Bags Incinerated',
      width: '2',
      marker: { visible: true, width: 10, height: 10 },
      type: 'Line' },
  
  
  ]:[];

  return (
    <>
     <TextField  style={{marginBottom:"10px"}} id="standard-basic" onChange={(e)=>setDate(e.target.value)} name='date' required  type='date' label="Date" variant="standard" />
     {loader?<div style={{height:"100%",width:"100%",display:'flex',justifyContent:"center"}}>
    <CircularProgress sx={{color:currentColor}}/>
</div>:
    <ChartComponent
      id="line-chart"
      height="420px"
      primaryXAxis={LinePrimaryXAxis}
      // primaryYAxis={LinePrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[ColumnSeries, Tooltip, LineSeries, Category,Legend]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {lineCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>}
      </>
  );
};

export default LineChart;
