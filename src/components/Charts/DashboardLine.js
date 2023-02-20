import React, { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective,Zoom, SeriesDirective, Inject, Legend, Tooltip,ColumnSeries ,LineSeries, Category, Export} from '@syncfusion/ej2-react-charts';
import {LinePrimaryXAxis, LinePrimaryYAxis } from '../../data/dummy';
import * as XLSX from 'xlsx'
import { useStateContext } from '../../contexts/ContextProvider';
import { Button, CircularProgress } from '@mui/material';
import { getDashboardLineData } from '../../controllers/apiController';
import { toast } from 'react-toastify';

const DashboardLine = () => {
  let { currentMode,currentColor} = useStateContext();

let auth = JSON.parse(sessionStorage.getItem("user"))

  let [data,setData]=useState([])
  let [loader,setLoader]=useState(true)

  useEffect(async()=>{

      let resp = await getDashboardLineData();
      if(resp){
          setData(resp.message);
          setLoader(false)
      }else{
        toast.error("something Went Wrong");
      }

  },[])

  const zoomsettings = {
    enableMouseWheelZooming: false,
    enablePinchZooming: true,
    enableSelectionZooming: false,
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

  const palette = ["#E94649", "#F6B53F", "#6FAAB0", "#C4C24A"];

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
    {auth.role=="admin"?<div style={{display:"flex",justifyContent:"center"}}><Button onClick={exportDataToExcle} style={{marginBottom:"10px"}} variant="contained" color="inherit">Export Line Chart Data </Button></div>:null}
    <ChartComponent
      palettes={palette}
      id="line-chart"
      height="420px"
      width='100%'
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

export default DashboardLine;

