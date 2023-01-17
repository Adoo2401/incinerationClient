import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import {addOperatorData, getLocation} from '../controllers/apiController'
import calculateTimeDiff from '../controllers/CalculateTimeDifference'
import { useStateContext } from '../contexts/ContextProvider';
import { toast } from 'react-toastify';

const OperatorInput = () => {

    const [data,setData]=React.useState({
        date:undefined,
        location:undefined,
        startTime:undefined,
        endTime:undefined,
        totalTime:undefined,
        shift:undefined,
        operatorName:undefined,
        break:undefined,
        totalWorkingTime:undefined
    })

    let token=sessionStorage.getItem("token");

    const [totalTime,setTotalTime]=React.useState('00:00');
    const { currentColor} = useStateContext();
    const [menuItem,setMenuItem]=React.useState([]);
    const [menuLoader,setMenuLoader]=React.useState(true);
    const [loader,setLoader]=React.useState(false);


    React.useEffect(async()=>{
      let resp=await getLocation(token);
      if(resp){
        setMenuItem(resp.message);
        setMenuLoader(false)
      }
    },[])

    React.useEffect(()=>{
        if(!data.startTime || !data.endTime)  return
        setTotalTime(calculateTimeDiff(new Date(data.startTime),new Date(data.endTime)))
    },[data])

    function changeInput(e){
        setData({...data,[e.target.name]:e.target.value})
      }

    async function handleSubmit(e){
      setLoader(true);
      e.preventDefault();
      let resp=await addOperatorData(token,{...data,totalTime,totalWorkingTime:totalTime})
      if(resp){
        setLoader(false);
        toast.success("Added Successfully");
      }else{
        toast.error("Something Went Wrong")
        setLoader(false);
      }
    }

  return (

    loader?<div style={{height:"100%",width:"100%",display:'flex',justifyContent:"center"}}>
    <CircularProgress sx={{color:currentColor}}/>
</div>:
    <form onSubmit={handleSubmit}>
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
        <TextField style={{margin:"20px 0"}} id="standard-basic" onChange={changeInput} name="startTime" required label="start time" type="datetime-local" variant="standard" />
        <TextField style={{margin:"20px 0"}} id="standard-basic" onChange={changeInput} name="endTime"  required label="end time" type="datetime-local" variant="standard" />
        <TextField style={{margin:"20px 0"}} id="standard-basic" value={totalTime} disabled variant="standard" label="Total Time" />
    </div>
    <div style={{width:'100%',display:"grid", gridTemplateColumns:"1fr"}} >
    <TextField style={{margin:"20px 0"}} id="standard-basic" onChange={changeInput} name="shift" required label="shift" type="number" variant="standard" />
    <TextField style={{margin:"20px 0"}} id="standard-basic" onChange={changeInput} name="operatorName" required label="Operator Name" type="text" variant="standard" />
    <TextField style={{margin:"20px 0"}} id="standard-basic" onChange={changeInput} name="break" required label="break" type="number" variant="standard" />
    <TextField style={{margin:"20px 0"}} id="standard-basic" onChange={changeInput} name="totalWorkingTime" required label="Total Working Time" disabled value={totalTime} type="text" variant="standard" />
    </div>
    <div style={{width:'100%',display:"grid", gridTemplateColumns:"1fr",marginTop:"20px"}}>
         <Button type="submit" variant="contained"  style={{flex:0.3,backgroundColor:currentColor}}>Add</Button>
    </div>
    </form>
  )
}

export default OperatorInput