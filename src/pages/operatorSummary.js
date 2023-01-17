import React, { useEffect, useState } from 'react';
import {GridComponent,ColumnsDirective,ColumnDirective,Page,Selection,Inject,Edit,Toolbar,Sort,Filter,Search,PdfExport, ExcelExport} from '@syncfusion/ej2-react-grids'
import {contextMenuItems, operatorSummaryGrid} from '../data/dummy';
import { Header } from '../components';
import { getOperatorSumary} from '../controllers/apiController';
import { CircularProgress, TextField } from '@mui/material';
import { toast } from 'react-toastify';

const OperatorSummary = ({dateFrom,to}) => {

  const [data,setData]=useState([])
  let token=sessionStorage.getItem("token")
  const [loader,setLoader]=useState(false);
  const [date,setDate]=useState("");

  useEffect(async()=>{
  
    setDate(dateFrom)
    if(date!==""){
        setLoader(true)
        let resp=await getOperatorSumary(token,dateFrom,to);
    if(resp){
  
        setData(resp.message)
        return setLoader(false) 
    }

    toast.error("Something Went Wrong");
    }

  },[date,to])

  let grid;
  const toolbarClick = (args) => {

    if (grid && args.item.id === 'grid_excelexport') {
        grid.excelExport();
    }else{
      grid.pdfExport();
    }

  }

  
  return (
    <>

      {loader?<div style={{height:"100%",width:"100%",display:'flex',justifyContent:"center"}}>
        <CircularProgress/>
      </div>:<GridComponent id='grid' ref={g => grid = g} filterSettings={{ignoreAccent:true,type:"Excel"}} allowTextWrap={true} dataSource={data} allowPdfExport={true} pageSettings={{pageSize:15}} toolbarClick={toolbarClick} allowExcelExport={true} width="40%" toolbar={['Search','ExcelExport',"PdfExport"]}  allowSorting allowFiltering  allowPaging>
        <ColumnsDirective>

           {operatorSummaryGrid.map((item,index)=>
             
            <ColumnDirective  key={index} {...item}/>
           )}

        </ColumnsDirective>
        <Inject services={[Page,Search,Toolbar,Selection,Filter,Edit,Sort,PdfExport,ExcelExport]} />
      </GridComponent>}
</>
  );
};
export default OperatorSummary;
