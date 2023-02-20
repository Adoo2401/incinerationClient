import React, { useEffect, useState } from 'react';
import {GridComponent,ColumnsDirective,ColumnDirective,Page,Selection,Inject,Edit,Toolbar,Sort,Filter,Search,PdfExport, ExcelExport} from '@syncfusion/ej2-react-grids'
import { Header } from '../components';
import { deletee, getIncinerationProgress } from '../controllers/apiController';
import { Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { RiDeleteBack2Line, RiEditCircleFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useStateContext } from '../contexts/ContextProvider';

const IncinerationProgress = () => {

  

  const [data,setData]=useState([])
  let token=sessionStorage.getItem("token")
  const [grid,setGrid]=useState([]);
  const [loader,setLoader]=useState(true);
  const {currentColor} =useStateContext()

  async function getData(){
    let resp=await getIncinerationProgress(token);
    if(resp){
      setData(()=>{
        return resp.message.map((elm)=>{
          let backlog=elm.wasteCollected-elm.weightIncinerated
          backlog=backlog.toFixed(2);
          backlog=Number(backlog)                         
      
          return {...elm,date:new Date(elm.date.substring(0,16)),backlog};
        })
      })
      setLoader(false)
    }

  }

  useEffect(()=>{
   
    if(loader) { return }
 
    let grid =document.querySelector('.e-grid');

  
    grid.classList.add(`${currentColor==="#1A97F5"?"blue-theme":currentColor==="#03C9D7"?"green-theme":currentColor==="#7352FF"?"purple-theme":currentColor==="#FF5C8E"?"red-theme":currentColor==="#1E4DB7"?"indigo-theme":"orange-theme"}`)

  },[loader])

  useEffect(()=>{
    const start=(props)=>{
      let start=props.start.split("t")
      return <p>{start[0]+"  "+start[1]}</p>
    }
    
     const end=(props)=>{
      let end=props.end.split("t")
      return <p>{end[0]+"  "+end[1]}</p>
    }
  
    const Edit=(props)=>{
  
      return(
        <Link to={`/editIncinerationProgress/${props._id}`}><Button variant='contained' color="inherit" endIcon={<RiEditCircleFill/>}>Edit</Button></Link>
      )
    
    }
    
    const Delete=(props)=>{
    
      async function del(){
      
       if(window.confirm("Are you sure you want to delete this entry?")){
    
       
       let resp=await deletee(sessionStorage.getItem("token"),props._id);
       if(resp){
        toast.success("Deleted");
        getData();
       }
      }
      }
    
      return(
        <Button onClick={del} variant='contained' color="error" endIcon={<RiDeleteBack2Line/>}>Delte</Button>
      )
    
    }
    
    const location=(props)=>{
    
      const arr = props.location.split(" ");
    
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    
    }
    
    const str2 = arr.join(" ");
      return(
        <p>{str2}</p>
      )
    }
    
    const status=(props)=>{
    
      const arr = props.status.split(" ");
    
      for (var i = 0; i < arr.length; i++) {
          arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      
      }
      
      const str2 = arr.join(" ");
        return(
          <p>{str2}</p>
        )
    
    }

    
    
    const activity=(props)=>{
      const arr = props.activity.split(" ");
    
      for (var i = 0; i < arr.length; i++) {
          arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      
      }
      
      const str2 = arr.join(" ");
        return(
          <p>{str2}</p>
        )
    }
    
    const shutdownNature=(props)=>{
      const arr = props.shutdownNature.split(" ");
    
      for (var i = 0; i < arr.length; i++) {
          arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      
      }
      
      const str2 = arr.join(" ");
        return(
          <p>{str2}</p>
        )
    }
    const reason=(props)=>{
      const arr = props.reason.split(" ");
    
      for (var i = 0; i < arr.length; i++) {
          arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      
      }
      
      const str2 = arr.join(" ");
        return(
          <p>{str2}</p>
        )
    }
    const operator=(props)=>{
      const arr = props.operator.split(" ");
    
      for (var i = 0; i < arr.length; i++) {
          arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      
      }
      
      const str2 = arr.join(" ");
        return(
          <p>{str2}</p>
        )
    }
    
    

    const dateFormat=(props)=>{
      let formatedDate=props.date.toString();
      formatedDate=formatedDate.substring(0,15);
      return(
        <p>{formatedDate}</p>
      )
    }
    
    setGrid([
      {
        field:"date",
        textAlign:"Center",
        headerText: 'Date',
        template:dateFormat,
        width: '150',
        FontAttributes:"Bold",
        TextColor:"Black" ,
        BackgroundColor:"Gray"
      },
      {
        field: 'location',
        template:location,
        textAlign:"Center",
        headerText: 'Location',
        filter:{type:"CheckBox"},
        width: '150',
      },
      { field: 'start',
      textAlign:"Center",
        headerText: 'Start',
        width: '150',
        template:start
      },
      {
        field: 'end',
        textAlign:"Center",
        headerText: 'End',
        width: '150',
        template:end
      },
      {
        headerText: 'Total Time',
        textAlign:"Center",
        field: 'totalTime',
        width: '150',
      },
      {
        field: 'status',
        template:status,
        textAlign:"Center",
        headerText: 'Status',
        width: '150',
      },
    
      {
        field: 'activity',
        template:activity,
        textAlign:"Center",
        headerText: 'Activity',
        width: '150',
      },
      
      {
        field: 'shutdownNature',
        template:shutdownNature,
        textAlign:"Center",
        headerText: 'Shutdown Nature',
        width: '150',
      },
      {
        field: 'reason',
        template:reason,
        textAlign:"Center",
        headerText: 'Reason',
        width: '150',
      },
      {
        field: 'bagsIncinerated',
        textAlign:"Center",
        headerText: 'Bags Incinerated',
        width: '150',
      },
      {
        field:"wasteCollected",
        textAlign:"Center",
        headerText:"Waste Collected",
        width:'150'
      },
      {
        field: 'weightIncinerated',
        textAlign:"Center",
        headerText: 'Waste Incinerated',
        width: '150',
      },
      {
        field:"backlog",
        textAlign:"Center",
        headerText:"Backlog",
        width:"150"
    
      },
      {
        field: 'operator',
        template:operator,
        textAlign:"Center",
        headerText: 'Operator',
        width: '150',
      },
      {
        field: 'remarks',
        textAlign:"Center",
        headerText: 'Remarks',
        width: '150',
      },
      {
        field: 'Edit',
        template:Edit,
        textAlign:"Center",
        headerText: 'Edit',
        width: '150',
      },
      {
        field: 'Delete',
        template:Delete,
        textAlign:"Center",
        headerText: 'Delete',
        width: '150',
      },])
    

    getData();
    
  },[])

  let grids;

  
    function pdfConfigfunction(args){ 
   
      console.log(args.cell.width)
      args.cell.width = 100;        // Set the column width as 50 
       
  } 

  const toolbarClick = (args) => {
    
    
    if (grids && args.item.id === 'grids_excelexport') {
        grids.excelExport();
    }

    if (grids && args.item.id === 'grids_pdfexport') {
      grids.pdfExport();
  }

  }

  

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Incineration Progress" />
      {loader?<div style={{height:"100%",width:"100%",display:'flex',justifyContent:"center"}}>
        <CircularProgress sx={{color:currentColor}}/>
      </div>:<GridComponent pdfHeaderQueryCellInfo={pdfConfigfunction} className='dffdd' toolbarClick={toolbarClick} ref={g => grids = g} id='grids' filterSettings={{ignoreAccent:true,type:"Excel"}} allowTextWrap={true} dataSource={data} allowExcelExport={true} allowPdfExport={true} pageSettings={{pageSize:10}} toolbar={['Search','ExcelExport',"PdfExport"]} width='auto' allowSorting allowFiltering  allowPaging>
        <ColumnsDirective>

           {grid.map((item,index)=>
             
            <ColumnDirective  key={index} filter={index===1?{type:"CheckBox"}:{}} {...item}/>
           )}

        </ColumnsDirective>
        <Inject services={[Page,Search,Toolbar,Selection,Filter,Edit,Sort,PdfExport,ExcelExport]} />
      </GridComponent>}
    </div>
  );
};
export default IncinerationProgress;
