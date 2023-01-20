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
  const [loader,setLoader]=useState(false)


  let token=sessionStorage.getItem("token")

  useEffect(async()=>{
  
    if(date!=="" && to!==""){
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

  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">


      <Header category="Page" title="Summary" />
      <TextField style={{marginBottom:"10px"}} id="standard-basic" onChange={(e)=>setDate(e.target.value)} name='date' required  type='date' label="From Date" variant="standard" />
      <TextField style={{marginLeft:"20px"}} id="standard-basic" onChange={(e)=>setTo(e.target.value)} name='date' required  type='date' label="To Date" variant="standard" />
      <FilterLocations select={select} setSelect={setSelect}/>
       {loader?<div style={{height:"100%",width:"100%",display:'flex',justifyContent:"center"}}>
        <CircularProgress sx={{color:currentColor}}/>
    </div>:<div style={{width:"100%",display:"flex",justifyContent:"space-around",flexWrap:'wrap',marginTop:"20px"}}>
      <GridComponent ref={g => grid = g} id='grid' allowTextWrap={true} dataSource={data} allowPdfExport={true} allowExcelExport={true} width="50%" toolbarClick={toolbarClick} toolbar={['Search','ExcelExport',"PdfExport"]}  allowSorting allowFiltering >
        <ColumnsDirective>

           {incinerationSummaryGrid.map((item,index)=>
             
            <ColumnDirective key={index} {...item}/>
           )}

        </ColumnsDirective>
        <Inject services={[Page,Search,Toolbar,Selection,Filter,Edit,Sort,PdfExport,ExcelExport]} />
      </GridComponent>
      <OperatorSummary select={select} dateFrom={date} to={to}/>
      </div>
      }


    
    
    {date!="" && to!=""?<div style={{display:'flex',alignItems:"center",alignContent:"center",justifyContent:"space-between",width:'100%',flexWrap:"wrap"}}><ColorMapping select={select} dateFrom={date} to={to}/><Line select={select} line={line} setLine={setLine} dateProp={date} to={to}/></div>:null}
    {date!="" && to!=""?<div style={{display:'flex',alignItems:"center",alignContent:"center",justifyContent:"space-between",width:'100%',flexWrap:"wrap"}}><Stacked select={select} setStacked={setStacked} to={to} dateProp={date}/><Pie select={select} to={to} dateProp={date}/></div>:null}
  


    </div>
  );
};
export default Summary;
