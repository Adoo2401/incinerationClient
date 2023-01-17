import React, { useEffect, useState } from 'react';
import {GridComponent,ColumnsDirective,ColumnDirective,Page,Selection,Inject,Edit,Toolbar,Sort,Filter,Search,PdfExport} from '@syncfusion/ej2-react-grids'
import { Header } from '../components';
import { CircularProgress, TextField } from '@mui/material'
import {SparkLine } from '../components';
import WeeklyTotal from '../components/WeeklyTotal';
import { useStateContext } from '../contexts/ContextProvider';
import { getStackedLineData } from '../controllers/apiController';

const WeeklySummary = () => {

  const [data,setData]=useState([])
  let token=sessionStorage.getItem("token")
  const [loader,setLoader]=useState(false);
  const [date,setDate]=useState("")
  const { currentColor} = useStateContext();
  let [weeklySummaryProgressGrid,setWeeklySummaryGrid]=useState([])

  useEffect(async()=>{
  
    if(date!=''){
        setLoader(true)
        let resp=await getStackedLineData(token,date);
    
        if(resp){



          const sixth = date!=""?new Date( new Date(date).getTime()):"";
          const fourth = date!=""?new Date( new Date(date).getTime()):"";
          const fifth = date!=""?new Date( new Date(date).getTime()):"";
          const third = date!=""?new Date( new Date(date).getTime()):"";
          const second = date!=""?new Date( new Date(date).getTime()):"";
          const first = date!=""?new Date( new Date(date).getTime()):"";

          if(date!=""){

            sixth.setDate( new Date(date).getDate() - 1)
            fourth.setDate( new Date(date).getDate() - 3)
            third.setDate( new Date(date).getDate() - 4)
            second.setDate( new Date(date).getDate() - 5)
            first.setDate( new Date(date).getDate() - 6)

          }


        function avg(props){
          return Math.ceil((props.total+7)/7)
        }

        function trend(props){
          return <SparkLine currentColor={currentColor} id="area-sparkLine" height="60px" type="Area" data={props.trend} width="320" color="rgb(242, 252, 253)" />
        }
      
      
          setWeeklySummaryGrid([
            {
              field:"location",
              textAlign:"Center",
              headerText: 'Locations',
              width: '100',
            },
            {
              field: new Date(date).toString().slice(0,15),
              textAlign:"Center",
              width: '100',
            },
            {
              field:sixth.toString().slice(0,15),
              textAlign:"Center",
              width: '100',
            },
            {
              field:fifth.toString().slice(0,15),
              textAlign:"Center",
              width: '100',
            },
            {
              field:fourth.toString().slice(0,15),
              textAlign:"Center",
              width: '100',
            },
            {
              field:third.toString().slice(0,15),
              textAlign:"Center",
              width: '100',
            },
            {
              field:second.toString().slice(0,15),
              textAlign:"Center",
              width: '100',
            },
            {
              field:first.toString().slice(0,15),
              textAlign:"Center",
              width: '100',
            },
            {
              field:"total",
              headerText:"Total",
              textAlign:"Center",
              width: '100',
            },
            {
              headerText:'Avg/Day',
              template:avg,
              textAlign:"center",
              width:'100',
            },{
              template:trend,
              headerText:"Trend",
              textAlign:"center",
              width:'350'
            }
          ])
          setLoader(false)
          setData(resp.message)
        }
    }
    

  },[date])

     
  
  return (
    <>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Weekly Summary" />
      <TextField id="standard-basic" onChange={(e)=>setDate(e.target.value)} name='date' required  type='date' label="Date" variant="standard" />
      {loader?<div style={{height:"100%",width:"100%",display:'flex',justifyContent:"center"}}>
        <CircularProgress sx={{color:currentColor}}/>
    </div>:null}
    
     {weeklySummaryProgressGrid.length>0 && data.length>0 && loader===false?
     <>
      <GridComponent allowTextWrap={true} dataSource={data} allowPdfExport={true} pageSettings={{pageSize:15}} page toolbar={['Search']} width='auto' allowSorting allowFiltering  allowPaging>
      <ColumnsDirective>

         {weeklySummaryProgressGrid.map((item,index)=>
           
           <ColumnDirective key={index} {...item}/>
           )}

      </ColumnsDirective>
      <Inject services={[Page,Search,Toolbar,Selection,Filter,Edit,Sort,PdfExport]} />
    </GridComponent>
    {data.length>0?<WeeklyTotal data={data}/>:null}
           </>

     :null}
    </div>
    </>
  );
};
export default WeeklySummary;
