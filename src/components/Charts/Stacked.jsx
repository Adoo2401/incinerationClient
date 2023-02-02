import React,{useState,useEffect} from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip, Export, Zoom } from '@syncfusion/ej2-react-charts';
import { Button, CircularProgress} from '@mui/material'
import * as XLSX from 'xlsx'

import {stackedPrimaryXAxis, stackedPrimaryYAxis } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';
import { getStackedData } from '../../controllers/apiController';
import { TextField} from '@mui/material';

const Stacked = ({ width, height,dateProp,to,setStacked ,select}) => {
  const { currentMode } = useStateContext();
  let token=sessionStorage.getItem("token");
  const [data,setData]=useState([])
  const [loader,setLoader]=useState(false)
  const { currentColor} = useStateContext();

  useEffect(async()=>{
    
    if(dateProp!=='' && to!=""){
      setLoader(true)
      let resp=await getStackedData(token,dateProp,to,select)
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
  
  const stackedCustomSeries=data.length>0?[
  
    { dataSource: data[0],
      xName: 'location',
      yName: 'totalTime',
      name: 'Cooling Down',
      type: 'StackingColumn',
      background: 'blue',
  
    },
  
    { dataSource: data[1],
      xName: 'location',
      yName: 'totalTime',
      name: 'De Ashing',
      type: 'StackingColumn',
      background: 'red',
    },
    { dataSource: data[2],
      xName: 'location',
      yName: 'totalTime',
      name: 'electricity issue',
      type: 'StackingColumn',
      background: 'purple',
    },
    { dataSource: data[3],
      xName: 'location',
      yName: 'totalTime',
      name: 'waste finished',
      type: 'StackingColumn',
      background: 'black',
    },
    { dataSource: data[4],
      xName: 'location',
      yName: 'totalTime',
      name: 'security duty',
      type: 'StackingColumn',
      background: 'green',
    },
    { dataSource: data[5],
      xName: 'location',
      yName: 'totalTime',
      name: 'incinerator fault',
      type: 'StackingColumn',
      background: 'yellow',
    },
    { dataSource: data[6],
      xName: 'location',
      yName: 'totalTime',
      name: 'Cleaning',
      type: 'StackingColumn',
      background: 'cyan',
    },
    { dataSource: data[7],
      xName: 'location',
      yName: 'totalTime',
      name: 'Natural gas issue',
      type: 'StackingColumn',
      background: 'orange',
    },
  
  ]:[];

  function exportDataToExcle(){
    let s=[].concat(...data);
    s=s.map((elm)=>{
      return {activity:elm.activity,location:elm.location,totalTime:Number(elm.totalTime)}
    })
    const ws = XLSX.utils.json_to_sheet(s);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "LineChartData");
    
    XLSX.writeFile(wb, 'stackedChart.xlsx');
  }

  return (
    <>
    {loader?<div style={{height:"100%",width:"100%",display:'flex',justifyContent:"center"}}>
    <CircularProgress sx={{color:currentColor}}/>
</div>:<><Button onClick={exportDataToExcle} style={{marginBottom:"10px"}} variant="contained" color="inherit">Export Stacked Chart Data </Button><ChartComponent
      id="stacked"
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      width={"100%"}
      height={"500px"}
      ref={chart => setStacked(chart)}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
      zoomSettings={zoomsettings}
    >
      <Inject services={[Zoom,StackingColumnSeries, Category, Legend, Tooltip,Export]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {stackedCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent></>}
    </>
  );
};

export default Stacked;
