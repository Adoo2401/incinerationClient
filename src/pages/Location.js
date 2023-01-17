import React, { useEffect, useState } from 'react';
import {GridComponent,ColumnsDirective,ColumnDirective,Page,Selection,Inject,Edit,Toolbar,Sort,Filter,Search,PdfExport} from '@syncfusion/ej2-react-grids'
import { Header } from '../components';
import { getLocation,addLocation,deleteLocation} from '../controllers/apiController';
import { Button, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import { RiDeleteBack2Line } from 'react-icons/ri';

const Location = () => {

  const [data,setData]=useState([])
  let token=sessionStorage.getItem("token")
  const [loader,setLoader]=useState(true);

  async function fetchLocations(){
    let resp=await getLocation(token);
    
    if(resp){
      setData(resp.message)
      setLoader(false)
    }
  }
  
  useEffect(async()=>{
      fetchLocations();
  },[])

  const location=(props)=>{
    return <p style={{textTransform:'capitalize'}}>{props.location}</p>
  }

  const Delete=(props)=>{

    async function del(){

         if(window.confirm("Are you sure you want to delete this location")){
           let resp=await deleteLocation(token,props._id);
           if(resp){
            toast.success("Successfully Deleted");
            fetchLocations();
           }else{
            toast.error("Something Went Wrong");
           }
         }
    }

    return(
        <Button onClick={del} variant='contained' color="error" endIcon={<RiDeleteBack2Line/>}>Delte</Button>
    )
  }

  const locationGrid=[
    {
        field:"location",
        template:location,
        headerText:"Locations",
        textAlign:"center"
    },
    {
        field: 'Delete',
        template:Delete,
        textAlign:"Center",
        headerText: 'Delete',
        width: '150',
      },
  ]


  async function postLocation(){
    let location=window.prompt("location")
    
    if(location==="" || location===null){
        return;
    }

    let resp=await addLocation(token,location);
    if(resp){

        if(resp.message==="Location already exists"){
            toast.error(resp.message);
            return;
        }

        toast.success("Location Added");
        fetchLocations();
        return;
    }

    toast.error("Something Went Wrong");
   
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Locations" />
      <Button style={{marginBottom:"10px"}} color="inherit" variant='contained' onClick={postLocation}>Add Location</Button>
      {loader?<div style={{height:"100%",width:"100%",display:'flex',justifyContent:"center"}}>
        <CircularProgress/>
      </div>:<GridComponent filterSettings={{ignoreAccent:true,type:"Excel"}} allowTextWrap={true} dataSource={data} allowPdfExport={true} pageSettings={{pageSize:15}} toolbar={['Search']} width='auto' allowSorting allowFiltering  allowPaging>
        <ColumnsDirective>

           {locationGrid.map((item,index)=>
             
            <ColumnDirective  key={index} filter={index===1?{type:"CheckBox"}:{}} {...item}/>
           )}

        </ColumnsDirective>
        <Inject services={[Page,Search,Toolbar,Selection,Filter,Edit,Sort]} />
      </GridComponent>}
    </div>
  );
};
export default Location;
