import React, { useEffect, useState } from 'react';
import {GridComponent,ColumnsDirective,ColumnDirective,Page,Selection,Inject,Edit,Toolbar,Sort,Filter,Search,PdfExport} from '@syncfusion/ej2-react-grids'
import {contextMenuItems, operatorSummaryGrid} from '../data/dummy';
import { Header } from '../components';
import { getOperatorSumary} from '../controllers/apiController';
import { CircularProgress, TextField } from '@mui/material';
import { toast } from 'react-toastify';

const OperatorSummary = () => {

  const [data,setData]=useState([])
  let token=sessionStorage.getItem("token")
  const [loader,setLoader]=useState(false);
  const [date,setDate]=useState("");

  useEffect(async()=>{
  
    if(date!==""){
        setLoader(true)
        let resp=await getOperatorSumary(token,date);
    if(resp){
        setData(resp.message)
        return setLoader(false) 
    }

    toast.error("Something Went Wrong");
    }

  },[date])

  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Operators Summary" />
      <TextField style={{marginBottom:"10px"}} id="standard-basic" onChange={(e)=>setDate(e.target.value)} name='date' required  type='date' label="Date" variant="standard" />
      {loader?<div style={{height:"100%",width:"100%",display:'flex',justifyContent:"center"}}>
        <CircularProgress/>
      </div>:<GridComponent filterSettings={{ignoreAccent:true,type:"Excel"}} allowTextWrap={true} dataSource={data} allowPdfExport={true} pageSettings={{pageSize:50}} toolbar={['Search']} width='auto' allowSorting allowFiltering  allowPaging>
        <ColumnsDirective>

           {operatorSummaryGrid.map((item,index)=>
             
            <ColumnDirective  key={index} {...item}/>
           )}

        </ColumnsDirective>
        <Inject services={[Page,Search,Toolbar,Selection,Filter,Edit,Sort]} />
      </GridComponent>}
    </div>
  );
};
export default OperatorSummary;
