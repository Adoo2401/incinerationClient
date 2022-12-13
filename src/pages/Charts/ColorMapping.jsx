import React, { useState ,useEffect} from 'react'
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, DataLabel, ColumnSeries } from '@syncfusion/ej2-react-charts';
import { Header } from '../../components';
import { CircularProgress, TextField } from '@mui/material';

import { useStateContext } from '../../contexts/ContextProvider';
import { getColorMappingData } from '../../controllers/apiController';

const ColorMapping = () => {
  const {currentColor,currentMode}=useStateContext();
  const [date,setDate]=useState("");
  const [data,setData]=useState([]);
  const [loader,setLoader]=useState(false);
  const token=sessionStorage.getItem("token")

   useEffect(async()=>{

    if(date!==''){
      setLoader(true)
      let resp=await getColorMappingData(token,date)
    if(resp){
      setData(resp.message)
      return setLoader(false)
    }
    }

   },[date])

    const pointRender = (args) => {
        let seriesColor = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883',
            '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb', '#ea7a57','#8B7E74','#863A6F','#7743DB'];
        args.fill = seriesColor[args.point.index];
    };

    
    const primaryxAxis = { valueType: 'Category', title: 'Locations' };
    const primaryyAxis = { minimum: 100, maximum: 1000, interval: 100, title: 'Waste Incinerated' };

    

  return (
    <div className='m-4 md:m-10 mt-24 p-10 dark:bg-secondary-dark-bg bg-white rounded-3xl'>

    <Header category={"Chart"} title="Weekly Incineration"/>

    <TextField  style={{marginBottom:"10px"}} id="standard-basic" onChange={(e)=>setDate(e.target.value)} name='date' required  type='date' label="Date" variant="standard" />

    {loader?<div style={{height:"100%",width:"100%",display:'flex',justifyContent:"center"}}>
    <CircularProgress sx={{color:currentColor}}/>
</div>:<ChartComponent tooltip={{enable:true}} legendSettings={{background:"white"}} background={currentMode==="Dark"?"#33373E":"#fff"}  id='charts' primaryXAxis={primaryxAxis} primaryYAxis={primaryyAxis} pointRender={pointRender} title='Weekly Incineration'>
      <Inject services={[ColumnSeries, Legend, Tooltip, DataLabel, Category]}/>
      <SeriesCollectionDirective>
        <SeriesDirective dataSource={data} xName='x' yName='y' name='Waste Incinerated' type='Column'>
        </SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>}
    </div>
  )
};

export default ColorMapping;
