import React, { useEffect, useState } from 'react';
import {GridComponent,ColumnsDirective,ColumnDirective,Page,Selection,Inject,Edit,Toolbar,Sort,Filter,Search} from '@syncfusion/ej2-react-grids'
import { Header } from '../components';
import { getLocation,addLocation,updateArchive} from '../controllers/apiController';
import { Button, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi';

const Location = () => {

  const [data,setData]=useState([])
  let token=sessionStorage.getItem("token")
  const [loader,setLoader]=useState(true);

  async function fetchLocations(prompt,value){
    let resp=await getLocation(token);
    
    if(resp){
      setData(resp)
      setLoader(false)
         if(prompt){
              toast.success(`Successfully ${value?"Archived":"Unarchived"}`);
         }
    }
  }
  
  useEffect(async()=>{
      fetchLocations(false);
  },[])

  const location=(props)=>{
    return <p style={{textTransform:'capitalize'}}>{props.location}</p>
  }

  const Archive=(props)=>{

    async function del(value){

         if(window.confirm(`Are you sure you want to ${value?"Archived":"Unarchived"} this location`)){
           let resp=await updateArchive(token,props._id,value);
           if(resp){
             fetchLocations(true,value);
           }else{
            toast.error("Something Went Wrong");
           }
         }
    }

    return(
        <>
        {props.archive?<Button onClick={()=>del(false)} variant='contained' color="success" endIcon={<BiArchiveOut/>}>UNARCHIVE</Button>:<Button onClick={()=>del(true)} variant='contained' color="error" endIcon={<BiArchiveIn/>}>ARCHIVE</Button>}
        </>
    )
  }

  const locationGrid=[
    {
        field:"location",
        template:location,
        headerText:"Locations",
        textAlign:"center",
        width:'50'
    },
    {
        field: 'Archive',
        template:Archive,
        textAlign:"Center",
        headerText: 'Archive',
        width: '50',
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
