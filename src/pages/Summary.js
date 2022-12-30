import React, { useEffect, useState } from 'react';
import { CircularProgress, TextField } from '@mui/material'
import {GridComponent,ColumnsDirective,ColumnDirective,Page,Selection,Inject,Edit,Toolbar,Sort,Filter,Search,PdfExport,ExcelExport} from '@syncfusion/ej2-react-grids'
import {contextMenuItems, incinerationSummaryGrid} from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

import { Header } from '../components';
import { getSummary} from '../controllers/apiController';
import { toast } from 'react-toastify';
import SummaryTotal from '../components/SummaryTotal';

const Summary = () => {

  const [data,setData]=useState([])
  const [date,setDate]=useState("")
  const { currentColor} = useStateContext();
  const [loader,setLoader]=useState(false)
  let token=sessionStorage.getItem("token")

  useEffect(async()=>{
  
    if(date!==""){
        setLoader(true)
        let resp=await getSummary(token,date);
    if(resp){
        setData(resp.message)
        return setLoader(false) 
    }

    toast.error("Something Went Wrong");
    }

  },[date])

  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Summary" />
      <TextField style={{marginBottom:"10px"}} id="standard-basic" onChange={(e)=>setDate(e.target.value)} name='date' required  type='date' label="Date" variant="standard" />
       {loader?<div style={{height:"100%",width:"100%",display:'flex',justifyContent:"center"}}>
        <CircularProgress sx={{color:currentColor}}/>
    </div>: <><GridComponent allowTextWrap={true} dataSource={data} allowPdfExport={true}  toolbar={['Search']} width='auto'  allowSorting allowFiltering >
        <ColumnsDirective>

           {incinerationSummaryGrid.map((item,index)=>
             
            <ColumnDirective key={index} {...item}/>
           )}

        </ColumnsDirective>
        <Inject services={[Page,Search,Toolbar,Selection,Filter,Edit,Sort,PdfExport,ExcelExport]} />
      </GridComponent>
      {data.length>0?<SummaryTotal data={data}/>:null}
      </>
      }
    </div>
  );
};
export default Summary;
