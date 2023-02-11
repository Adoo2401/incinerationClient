import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material'
import {GridComponent,ColumnsDirective,ColumnDirective,Page,Selection,Inject,Edit,Toolbar,Sort,Filter,Search,PdfExport,ExcelExport} from '@syncfusion/ej2-react-grids'
import {contextMenuItems,incinerationSummaryGrid} from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import Stacked from './Charts/Stacked'
import { Header } from '../components';
import { getSummary} from '../controllers/apiController';
import { toast } from 'react-toastify';
import Pie from './Charts/Pie';
import ColorMapping from './Charts/ColorMapping';
import Line from './Charts/Line';
import OperatorSummary from './operatorSummary';
import FilterLocations from '../components/FilterLocations';

const Summary = () => {

  const [data,setData]=useState([])
  const [select,setSelect]=useState([]);
  const [line,setLine]=useState()
  const [stacked,setStacked]=useState();
  const [pie,setPie]=useState();
  const [date,setDate]=useState("")
  const [to,setTo]=useState("");
  const { currentColor} = useStateContext();
  const [show,setShow]=useState(false);
  const [loader,setLoader]=useState(false)


  let token=sessionStorage.getItem("token")

  useEffect(async()=>{
  
    if(date!=="" && to!==""){
        setShow(true);
        setLoader(true)
        let resp=await getSummary(token,date,to,select);
    if(resp){
        
        setData(resp.message)
        setLoader(false)
       
        return  
  }

    toast.error("Something Went Wrong");
    }

  },[date,to,select])

  let grid;

  const toolbarClick = (args) => {

    if (grid && args.item.id === 'grid_excelexport') {
        grid.excelExport();
    }

    if (grid && args.item.id === 'grid_pdfexport') {
      grid.pdfExport();
  }

  }

  useEffect(()=>{
   
    if(loader || show===false) { return }
 
    let grid =document.querySelector('.e-grid');

  
    grid.classList.add(`${currentColor==="#1A97F5"?"blue-theme":currentColor==="#03C9D7"?"green-theme":currentColor==="#7352FF"?"purple-theme":currentColor==="#FF5C8E"?"red-theme":currentColor==="#1E4DB7"?"indigo-theme":"orange-theme"}`)

  },[loader,show])

  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">


      <Header category="Page" title="Summary" />
      <TextField style={{marginBottom:"10px"}} id="standard-basic" onChange={(e)=>setDate(e.target.value)} name='date' required  type='date' label="From Date" variant="standard" />
      <TextField style={{marginLeft:"20px"}} id="standard-basic" onChange={(e)=>setTo(e.target.value)} name='date' required  type='date' label="To Date" variant="standard" />
      <FilterLocations select={select} setSelect={setSelect}/>
       {loader?<div style={{height:"100%",width:"100%",display:'flex',justifyContent:"center"}}>
        <CircularProgress sx={{color:currentColor}}/>
    </div>:

    show!=false?

    
    <div style={{minHeight:"700px",display:'flex',alignItems:"center",justifyContent:"space-between",width:'100%',flexWrap:"wrap"}}>
      <GridComponent height={"300px"} filterSettings={{ignoreAccent:true,type:"Excel"}}  width={"50%"} style={{marginTop:"20px"}} ref={g => grid = g} id='grid' allowTextWrap={true} dataSource={data} allowPdfExport={true} pageSettings={{pageSize:10}} allowExcelExport={true} toolbarClick={toolbarClick} toolbar={['Search','ExcelExport',"PdfExport"]}  allowSorting allowFiltering >
        <ColumnsDirective>

           {incinerationSummaryGrid.map((item,index)=>
             
            <ColumnDirective key={index} {...item}/>
           )}

        </ColumnsDirective>
        <Inject services={[Page,Search,Toolbar,Selection,Filter,Edit,Sort,PdfExport,ExcelExport]} />
      </GridComponent>
      <Pie select={select} to={to} dateProp={date}/>
    </div>
      :null}

    {loader?null:show!==false?<Line select={select} line={line} setLine={setLine} dateProp={date} to={to}/>:null}
  
    </div>
  );
};
export default Summary;
