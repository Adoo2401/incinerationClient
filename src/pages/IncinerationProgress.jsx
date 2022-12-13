import React, { useEffect, useState } from 'react';
import {GridComponent,ColumnsDirective,ColumnDirective,Page,Selection,Inject,Edit,Toolbar,Sort,Filter,Search,PdfExport} from '@syncfusion/ej2-react-grids'
import {contextMenuItems, incinerationSummaryProgressGrid} from '../data/dummy';
import { Header } from '../components';
import { getIncinerationProgress } from '../controllers/apiController';

const IncinerationProgress = () => {

  const [data,setData]=useState([])
  let token=sessionStorage.getItem("token")

  useEffect(async()=>{
  
    let resp=await getIncinerationProgress(token);
    
    if(resp){
      setData(resp.message)
    }

  },[])

  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Incineration Progress" />
      <GridComponent allowTextWrap={true} dataSource={data} allowPdfExport={true} pageSettings={{pageSize:10}} page toolbar={['Search']} width='auto' allowSorting allowFiltering  allowPaging>
        <ColumnsDirective>

           {incinerationSummaryProgressGrid.map((item,index)=>
             
            <ColumnDirective key={index} {...item}/>
           )}

        </ColumnsDirective>
        <Inject services={[Page,Search,Toolbar,Selection,Filter,Edit,Sort,PdfExport]} />
      </GridComponent>
    </div>
  );
};
export default IncinerationProgress;
