import React, { useEffect, useState } from 'react';
import {GridComponent,ColumnsDirective,ColumnDirective,Page,Selection,Inject,Edit,Toolbar,Sort,Filter,Search,PdfExport} from '@syncfusion/ej2-react-grids'
import {contextMenuItems, operatorDataGrid} from '../data/dummy';
import { Header } from '../components';
import { getOperator} from '../controllers/apiController';
import { CircularProgress } from '@mui/material';
import { useStateContext } from '../contexts/ContextProvider';

const OperatorData = () => {

  const [data,setData]=useState([])
  let token=sessionStorage.getItem("token")
  const {currentColor} = useStateContext();
  const [loader,setLoader]=useState(true);

  useEffect(async()=>{
  
    let resp=await getOperator(token);
    
    if(resp){
      setData(resp.message)
      setLoader(false)
    }

  },[])

  useEffect(()=>{
   
    if(loader) { return }
 
    let grid =document.querySelector('.e-grid');

  
    grid.classList.add(`${currentColor==="#1A97F5"?"blue-theme":currentColor==="#03C9D7"?"green-theme":currentColor==="#7352FF"?"purple-theme":currentColor==="#FF5C8E"?"red-theme":currentColor==="#1E4DB7"?"indigo-theme":"orange-theme"}`)

  },[loader])

  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Operators Data" />
      {loader?<div style={{height:"100%",width:"100%",display:'flex',justifyContent:"center"}}>
        <CircularProgress sx={{color:currentColor}}/>
      </div>:<GridComponent filterSettings={{ignoreAccent:true,type:"Excel"}} allowTextWrap={true} dataSource={data} allowPdfExport={true} pageSettings={{pageSize:10}} toolbar={['Search']} width='auto' allowSorting allowFiltering  allowPaging>
        <ColumnsDirective>

           {operatorDataGrid.map((item,index)=>
             
            <ColumnDirective  key={index} {...item}/>
           )}

        </ColumnsDirective>
        <Inject services={[Page,Search,Toolbar,Selection,Filter,Edit,Sort]} />
      </GridComponent>}
    </div>
  );
};
export default OperatorData;
