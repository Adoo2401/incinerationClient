import React,{useState,useEffect} from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip } from '@syncfusion/ej2-react-charts';
import { CircularProgress} from '@mui/material'
import {stackedPrimaryXAxis, stackedPrimaryYAxis } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';
import { getStackedData } from '../../controllers/apiController';
import { TextField } from '@mui/material';

const Stacked = ({ width, height }) => {
  const { currentMode } = useStateContext();
  let token=sessionStorage.getItem("token");
  const [date,setDate]=useState("")
  const [data,setData]=useState([])
  const [loader,setLoader]=useState(false)
  const { currentColor} = useStateContext();

  useEffect(async()=>{
    
    if(date!==''){
      setLoader(true)
      let resp=await getStackedData(token,date)
    if(resp){
      setData(resp.message)
      return setLoader(false)
    }
    }

  },[date])



  
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
  
  ]:[];

  return (
    <>
    <TextField  style={{marginBottom:"10px"}} id="standard-basic" onChange={(e)=>setDate(e.target.value)} name='date' required  type='date' label="Date" variant="standard" />
    {loader?<div style={{height:"100%",width:"100%",display:'flex',justifyContent:"center"}}>
    <CircularProgress sx={{color:currentColor}}/>
</div>:<ChartComponent
      id="charts"
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      width={width}
      height={"500px"}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {stackedCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>}
    </>
  );
};

export default Stacked;
