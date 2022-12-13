import { TextField } from '@mui/material'
import React from 'react'
import Button from '@mui/material/Button';
import { useStateContext } from '../contexts/ContextProvider';
import calculateTimeDiff from '../controllers/CalculateTimeDifference'
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { addIncinerationProgress } from '../controllers/apiController';
import { toast } from 'react-toastify';

const IncinerationProgressInputs = () => {

    const { currentColor} = useStateContext();
    const [loader,setLoader]=React.useState(false);
    let token=sessionStorage.getItem("token")

    let [totalTime,setTotalTime]=React.useState("00:00")
    const [data,setData]=React.useState({date:undefined,location:undefined,start:undefined,end:undefined,totalTime,status:undefined,activity:undefined,shutdownNature:undefined,reason:undefined,bagsIncinerated:undefined,bagsWeight:undefined,operator:undefined,remarks:undefined})

    

    React.useEffect(()=>{
        if(!data.start || !data.end)  return
        setTotalTime(calculateTimeDiff(new Date(data.start),new Date(data.end)))
    },[data])

    function changeInput(e){
      setData({...data,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
      setLoader(true)
      e.preventDefault();
      let resp=await addIncinerationProgress({...data,totalTime,date:new Date(data.date),shutdownNature:data.shutdownNature?data.shutdownNature:"none",reason:data.reason?data.reason:"none",bagsIncinerated:data.bagsIncinerated?data.bagsIncinerated:0,remarks:data.remarks?data.remarks:'none',bagsWeight:data.bagsWeight?parseFloat(data.bagsWeight):0},token)
      if(resp){
        toast.success("Created");
        setLoader(false)
        return setData({date:undefined,location:undefined,start:undefined,end:undefined,totalTime,status:undefined,activity:undefined,shutdownNature:undefined,reason:undefined,bagsIncinerated:undefined,bagsWeight:undefined,operator:undefined,remarks:undefined})
      }
       
      toast.error("Something Went Wrong");
      setLoader(false)
    }

  return (
    loader?<div style={{height:"100%",width:"100%",display:'flex',justifyContent:"center"}}>
        <CircularProgress sx={{color:currentColor}}/>
    </div>:<form onSubmit={handleSubmit}>
    <div style={{width:'100%',display:"flex",justifyContent:"space-between",flexWrap:"wrap"}} > 
        <TextField id="standard-basic" onChange={changeInput} name='date' required  type='date' label="Date" variant="standard" />
        <FormControl style={{flex:0.3}}>
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
          <MenuItem value={"Sialkot"}>Sialkot</MenuItem>
          <MenuItem value={"Kasur"}>Kasur</MenuItem>
          <MenuItem value={"Nanakan Sb"}>Nanakan Sb</MenuItem>
          <MenuItem value={"Gujrat"}>Gujrat</MenuItem>
          <MenuItem value={"Chiniot"}>Chiniot</MenuItem>
          <MenuItem value={"Chichawatni"}>Chichawatni</MenuItem>
          <MenuItem value={"Bahawalpur"}>Bahawalpur</MenuItem>
          <MenuItem value={"Bhakkar"}>Bhakkar</MenuItem>
          <MenuItem value={"Vehari"}>Vehari</MenuItem>
          <MenuItem value={"Arifwala"}>Arifwala</MenuItem>
          <MenuItem value={"Sheikhupura"}>Sheikhupura</MenuItem>
          <MenuItem value={"Rajanpur"}>Rajanpur</MenuItem>
          <MenuItem value={"Gujranwala"}>Gujranwala</MenuItem>
          <MenuItem value={"Attock"}>Attock</MenuItem>
          
        </Select>
      </FormControl>
        <TextField id="standard-basic" onChange={changeInput} name="start" required label="start" type="datetime-local" variant="standard" />
        <TextField id="standard-basic" onChange={changeInput} name="end"  required label="end" type="datetime-local" variant="standard" />
        <TextField id="standard-basic" value={totalTime} disabled variant="standard" label="Total Time" />
    </div>
    <div style={{width:'100%',marginTop:"60px",display:"flex",justifyContent:"space-between",flexWrap:"wrap"}} > 
    <FormControl style={{flex:0.3}}>
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
        <TextField id="standard-basic"  onChange={changeInput} name='activity' required label="Activity" variant="standard" />
        <FormControl style={{flex:0.3}}>
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
        <TextField id="standard-basic"  onChange={changeInput} name='reason' label="Reason" variant="standard" />
        <TextField id="standard-basic"  onChange={changeInput} name='bagsIncinerated' variant="standard" label="Bags Incinerated" type="number" />
    </div>
    <div style={{width:'100%',marginTop:"60px",display:"flex",justifyContent:"space-between",flexWrap:"wrap"}} > 
        <TextField id="standard-basic"  onChange={changeInput} name='bagsWeight' label="Bags Weight KG" type={'text'} variant="standard" />
        <TextField id="standard-basic"  onChange={changeInput} name='operator' required label="Operator" variant="standard" />
        <TextField id="standard-basic"  onChange={changeInput} name='remarks' label="Remarks"  variant="standard" />
    </div>
    <div style={{width:"100%",display:"flex",marginTop:"40px",display:"flex",justifyContent:"center"}}>
         <Button type="submit" variant="contained"  style={{flex:0.3,backgroundColor:currentColor}}>Create</Button>
    </div>
    </form>
  )
}

export default IncinerationProgressInputs