import { TextField } from '@mui/material'
import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { useStateContext } from '../contexts/ContextProvider';
import calculateTimeDiff from '../controllers/CalculateTimeDifference'
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { update,getSingle } from '../controllers/apiController';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components';

const EditIncinerationProgress = () => {

    const { currentColor} = useStateContext();
    const [loader,setLoader]=React.useState(true);
    const navigate=useNavigate();
    const {id}=useParams();
    
    let token=sessionStorage.getItem("token")

    let [totalTime,setTotalTime]=React.useState("00:00")
    const [data,setData]=React.useState({date:undefined,location:undefined,start:undefined,end:undefined,totalTime,status:undefined,activity:undefined,shutdownNature:undefined,reason:undefined,bagsIncinerated:undefined,bagsWeight:undefined,operator:undefined,remarks:undefined})

    

    React.useEffect(()=>{
        if(!data.start || !data.end)  return
        setTotalTime(calculateTimeDiff(new Date(data.start),new Date(data.end)))
    },[data])

    useEffect(async()=>{
      let resp=await getSingle(token,id);
      if(resp){
        setData(resp.message);
        setLoader(false)
      }
    },[])

 

    function changeInput(e){
      setData({...data,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
      setLoader(true)
      e.preventDefault();
      let resp=await update({...data,totalTime,date:new Date(data.date),shutdownNature:data.shutdownNature?data.shutdownNature:"none",reason:data.reason?data.reason:"none",bagsIncinerated:data.bagsIncinerated?data.bagsIncinerated:0,remarks:data.remarks?data.remarks:'none',bagsWeight:data.bagsWeight?parseFloat(data.bagsWeight):0},token,id)
      if(resp){
        toast.success("Update");
        setLoader(false)
        return navigate("/IncinerationProgress")
      }
       
      toast.error("Something Went Wrong");
      
      setLoader(false)
    }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Edit Incineration Progress" />
    {loader?<div style={{height:"100%",width:"100%",display:'flex',justifyContent:"center"}}>
        <CircularProgress sx={{color:currentColor}}/>
    </div>:<form onSubmit={handleSubmit}>
    <div style={{width:'100%',display:"grid", gridTemplateColumns:"1fr"}} > 
        <TextField style={{margin:"20px 0"}} label="date" className='date' id="standard-basic date" onChange={changeInput} value={new Date(data.date).toISOString().split('T')[0]} name='date' required  type='date'  variant="standard" />
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
          <MenuItem  value={"sialkot"}>Sialkot</MenuItem>
          <MenuItem value={"kasur"}>Kasur</MenuItem>
          <MenuItem value={"nanakan Sb"}>Nanakan Sb</MenuItem>
          <MenuItem value={"gujrat"}>Gujrat</MenuItem>
          <MenuItem value={"chiniot"}>Chiniot</MenuItem>
          <MenuItem value={"chichawatni"}>Chichawatni</MenuItem>
          <MenuItem value={"bahawalpur"}>Bahawalpur</MenuItem>
          <MenuItem value={"bhakkar"}>Bhakkar</MenuItem>
          <MenuItem value={"vehari"}>Vehari</MenuItem>
          <MenuItem value={"arifwala"}>Arifwala</MenuItem>
          <MenuItem value={"sheikhupura"}>Sheikhupura</MenuItem>
          <MenuItem value={"rajanpur"}>Rajanpur</MenuItem>
          <MenuItem value={"gujranwala"}>Gujranwala</MenuItem>
          <MenuItem value={"attock"}>Attock</MenuItem>
          
        </Select>
      </FormControl>
        <TextField style={{margin:"20px 0"}} id="standard-basic" onChange={changeInput} name="start" value={data.start.toUpperCase()} required label="start" type="datetime-local" variant="standard" />
        <TextField style={{margin:"20px 0"}} id="standard-basic" onChange={changeInput} name="end"  required label="end" value={data.end.toUpperCase()} type="datetime-local" variant="standard" />
        <TextField style={{margin:"20px 0"}} id="standard-basic" value={totalTime} disabled  variant="standard" label="Total Time" />
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
        <TextField id="standard-basic" style={{marginTop:"20px"}} value={data.activity}  onChange={changeInput} name='activity' required label="Activity" variant="standard" />
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
          <MenuItem value='none'>none</MenuItem>
          <MenuItem value={"normal"}>Normal</MenuItem>
          <MenuItem value={"interrupted"}>Interrupted</MenuItem>
        </Select>
      </FormControl>
        <TextField style={{marginTop:"20px"}} id="standard-basic"  onChange={changeInput} value={data.reason} name='reason' label="Reason" variant="standard" />
        <TextField style={{marginTop:"20px"}} id="standard-basic"  onChange={changeInput} name='bagsIncinerated' value={data.bagsIncinerated} variant="standard" label="Bags Incinerated" type="number" />
    </div>
    <div style={{width:'100%',display:"grid", gridTemplateColumns:"1fr",marginTop:"20px"}} > 
        <TextField id="standard-basic" value={data.bagsWeight} style={{marginTop:"20px"}}  onChange={changeInput} name='bagsWeight' label="Bags Weight KG" type={'text'} variant="standard" />
        <TextField id="standard-basic" style={{marginTop:"20px"}} value={data.operator}  onChange={changeInput} name='operator' required label="Operator" variant="standard" />
        <TextField id="standard-basic" style={{marginTop:"20px"}}  onChange={changeInput} value={data.remarks} name='remarks' label="Remarks"  variant="standard" />
    </div>
    <div style={{width:'100%',display:"grid", gridTemplateColumns:"1fr",marginTop:"20px"}}>
         <Button type="submit" variant="contained"  style={{flex:0.3,backgroundColor:currentColor}}>Edit</Button>
    </div>
    </form>}
    </div>
  )
}

export default EditIncinerationProgress