import { TextField } from '@mui/material'
import React from 'react'
import Button from '@mui/material/Button';
import { useStateContext } from '../contexts/ContextProvider';
import calculateTimeDiff from '../controllers/CalculateTimeDifference'
import {AiFillFileExcel} from 'react-icons/ai'
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import * as XLSX from 'xlsx';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { addIncinerationProgress, getLocation } from '../controllers/apiController';
import { toast } from 'react-toastify';

const IncinerationProgressInputs = () => {

    const { currentColor} = useStateContext();
    const [loader,setLoader]=React.useState(false);
    const [file,setFile]=React.useState([])
    const [fileData, setFileData] = React.useState([]);
    const [menuItem,setMenuItem]=React.useState([]);
    const [menuLoader,setMenuLoader]=React.useState(true);
    let token=sessionStorage.getItem("token")

    let [totalTime,setTotalTime]=React.useState("00:00")
    const [data,setData]=React.useState({date:undefined,location:undefined,start:undefined,end:undefined,totalTime,status:undefined,activity:undefined,shutdownNature:undefined,reason:undefined,bagsIncinerated:undefined,weightIncinerated:undefined,operator:undefined,remarks:undefined,wasteCollected:undefined})

    React.useEffect(async()=>{
      let resp=await getLocation(token);
      if(resp){
        setMenuItem(resp);
        setMenuLoader(false)
      }
    },[])

    

    React.useEffect(()=>{
        if(!data.start || !data.end)  return
        setTotalTime(calculateTimeDiff(new Date(data.start),new Date(data.end)))
    },[data])

    function changeInput(e){
      setData({...data,[e.target.name]:e.target.value})
    }

    const fileChange=(e)=>{
      let fileReader=new FileReader();
      const file=e.target.files;
      setFile(e.target.files[0]);

      fileReader.onload=(e)=>{
        const dataArray = new Uint8Array(e.target.result);
        const workbook = XLSX.read(dataArray, { type: 'array' });
  
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const arrayOfObjects = XLSX.utils.sheet_to_json(sheet);
        setFileData(arrayOfObjects);

      }
      
      fileReader.readAsArrayBuffer(file[0]);
     
    }

    async function handleSubmit(e){
      setLoader(true)
      e.preventDefault();
      let resp=await addIncinerationProgress(fileData.length>0?fileData:{...data,totalTime,date:new Date(data.date),shutdownNature:data.shutdownNature?data.shutdownNature:"none",reason:data.reason?data.reason:"none",bagsIncinerated:data.bagsIncinerated?data.bagsIncinerated:0,wasteCollected:data.wasteCollected?data.wasteCollected:0,remarks:data.remarks?data.remarks:'none',weightIncinerated:data.weightIncinerated?parseFloat(data.weightIncinerated):0},token)
      if(resp.success){

        toast.success("Created");
        setLoader(false)
        return setData({date:undefined,location:undefined,start:undefined,end:undefined,totalTime,status:undefined,activity:undefined,shutdownNature:undefined,reason:undefined,bagsIncinerated:undefined,weightIncinerated:undefined,operator:undefined,remarks:undefined})
      }
       
      toast.error(resp.message);
      setLoader(false)
    }

  return (
    <>
    {loader?<div style={{height:"100%",width:"100%",display:'flex',justifyContent:"center"}}>
        <CircularProgress sx={{color:currentColor}}/>
    </div>:
    <>
  
    
    <form onSubmit={handleSubmit}>
    <Button component="label" variant="contained" sx={{backgroundColor:currentColor}} endIcon={<AiFillFileExcel/>}> Upload Excel File {file?.name}<input onChange={fileChange} hidden type="file" /></Button>
    {file.length===0?
    <>
    <div style={{width:'100%',display:"grid", gridTemplateColumns:"1fr"}} > 
        <TextField style={{margin:"20px 0"}} label="date" className='date' id="standard-basic date" onChange={changeInput} name='date' required  type='date'  variant="standard" />
        <FormControl style={{margin:"20px 0"}}>
        <InputLabel id="demo-simple-select-label">Location</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name='location'
          required
          value={data.location}
          label="Location"
          onChange={changeInput}
        >

          {!menuLoader?
          menuItem.map((elm)=>
          <MenuItem value={elm.location}>{elm.location}</MenuItem>
          )
          :null}
        
        </Select>
      </FormControl>
        <TextField style={{margin:"20px 0"}} id="standard-basic" onChange={changeInput} name="start" required label="start" type="datetime-local" variant="standard" />
        <TextField style={{margin:"20px 0"}} id="standard-basic" onChange={changeInput} name="end"  required label="end" type="datetime-local" variant="standard" />
        <TextField style={{margin:"20px 0"}} id="standard-basic" value={totalTime} disabled variant="standard" label="Total Time" />
    </div>
    <div style={{width:'100%',display:"grid", gridTemplateColumns:"1fr",marginTop:"20px"}} > 
    <FormControl style={{flex:0.3,marginTop:"20px"}}>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name='status'
          required
          value={data.status}
          label="Status"
          onChange={changeInput}
        >
          <MenuItem value={"operational"}>Operational</MenuItem>
          <MenuItem value={"non operational"}>Non Operational</MenuItem>
        </Select>
      </FormControl>
        <TextField id="standard-basic" style={{marginTop:"20px"}}  onChange={changeInput} name='activity' required label="Activity" variant="standard" />
        <FormControl style={{flex:0.3,marginTop:"20px"}}>
        <InputLabel id="demo-simple-select-label">Shutdown Nature</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name='shutdownNature'
          value={data.shutdownNature}
          label="Shutdown Nature"
          onChange={changeInput}
        >
          <MenuItem value={"normal"}>Normal</MenuItem>
          <MenuItem value={"interrupted"}>Interrupted</MenuItem>
        </Select>
      </FormControl>
        <TextField style={{marginTop:"20px"}} id="standard-basic"  onChange={changeInput} name='reason' label="Reason" variant="standard" />
        <TextField style={{marginTop:"20px"}} id="standard-basic"  onChange={changeInput} name='bagsIncinerated' variant="standard" label="Bags Incinerated" type="number" />
        <TextField style={{marginTop:"20px"}} id="standard-basic"  onChange={changeInput} name="wasteCollected" variant="standard" label="Waste Collected" type="number" />
    </div>
    <div style={{width:'100%',display:"grid", gridTemplateColumns:"1fr",marginTop:"20px"}} > 
        <TextField id="standard-basic" style={{marginTop:"20px"}}  onChange={changeInput} name='weightIncinerated' label="Waste Incinerated KG" type={'text'} variant="standard" />
        <TextField id="standard-basic" style={{marginTop:"20px"}}  onChange={changeInput} name='operator' required label="Operator" variant="standard" />
        <TextField id="standard-basic" style={{marginTop:"20px"}}  onChange={changeInput} name='remarks' label="Remarks"  variant="standard" />
    </div>
    <div style={{width:'100%',display:"grid", gridTemplateColumns:"1fr",marginTop:"20px"}}>
        
    </div>
    </>:null} <Button type="submit" variant="contained"  style={{flex:0.3,backgroundColor:currentColor}}>{file.name?"Upload":"Create"}</Button></form></>}
   
    </>
  )
}

export default IncinerationProgressInputs