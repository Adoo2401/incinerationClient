import React, { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective,Zoom, SeriesDirective, Inject, DateTime, Legend, Tooltip,ColumnSeries ,LineSeries, Category, Export} from '@syncfusion/ej2-react-charts';
import {LinePrimaryXAxis, LinePrimaryYAxis } from '../../data/dummy';
import * as XLSX from 'xlsx'
import { useStateContext } from '../../contexts/ContextProvider';
import { Button, CircularProgress, TextField } from '@mui/material';
import { getLineData } from '../../controllers/apiController';

const LineChart = ({dateProp,to,line,setLine,select}) => {
  const { currentMode,currentColor } = useStateContext();
  let token=sessionStorage.getItem("token");
  let [data,setData]=useState([])
  let [loader,setLoader]=useState(false)
  let [date,setDate]=useState("")

  useEffect(async()=>{

    setDate(dateProp)
    if(dateProp!=='' && to!=""){
      setLoader(true)
      let resp=await getLineData(token,dateProp,to,select)
    if(resp){
      setData(resp.message)
      return setLoader(false)
    }
    }

  },[dateProp,to,select])

  const zoomsettings = {
    enableMouseWheelZooming: true,
    enablePinchZooming: true,
    enableSelectionZooming: true,
    mode: 'X',
    enableScrollbar: true,
};

   const lineCustomSeries = data.length>0?[
    { dataSource:data[1],
      xName: 'x',
      yName: 'y',
      name: 'Waste Incinerated',
      width: '2',
      marker: { visible: true, width: 10, height: 10 },
      type: 'Line' },
  
    { dataSource:data[0],
      xName: 'x',
      yName: 'y',
      name: 'Bags Incinerated',
      width: '2',
      marker: { visible: true, width: 10, height: 10 },
      type: 'Line' },
    { dataSource:data[2],
      xName: 'x',
      yName: 'y',
      name: 'Waste Collected',
      width: '2',
      marker: { visible: true, width: 10, height: 10 },
      type: 'Line' },
  
  
  ]:[];

  function exportDataToExcle(){
    
    const ws = XLSX.utils.json_to_sheet([].concat(...data));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "LineChartData");
    
    XLSX.writeFile(wb, 'lineChart.xlsx');
  }

  return (
    <>
     {loader?<div style={{height:"100%",width:"100%",display:'flex',justifyContent:"center"}}>
    <CircularProgress sx={{color:currentColor}}/>
</div>:
    <>
    <div style={{display:"flex",justifyContent:"center"}}><Button onClick={exportDataToExcle} style={{marginBottom:"10px"}} variant="contained" color="inherit">Export Line Chart Data </Button></div>
    <ChartComponent
      id="line-chart"
      height="420px"
      width='100%'
      ref={chart => setLine(chart)}
      zoomSettings={zoomsettings}
      primaryXAxis={LinePrimaryXAxis}
      primaryYAxis={LinePrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[ColumnSeries,Zoom, Tooltip, LineSeries, Category,Legend,Export]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {lineCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>
    </>}
      </>
  );
};

export default LineChart;

