import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { RiCloseCircleFill } from 'react-icons/ri';
import LocationData from './LocationsData';
import { locationWiseData } from '../controllers/apiController';
import { CircularProgress } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BacklogLocations({open,handleClose}) {

    const [data,setData]=React.useState([]);
    const [loader,setLoader]=React.useState(true);

    async function fetchData(){
        let response=await locationWiseData();
        if(response){
            setData(response.message)
            setLoader(false)
        }
    }
 
    React.useEffect(()=>{
       fetchData();             
    },[])

  return (
    <>
    {loader?null:<div style={{position:"fixed"}}>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <RiCloseCircleFill />
            </IconButton>
          </Toolbar>
        </AppBar>
        <LocationData data={data}/>
      </Dialog>
    </div>}
    </>
  );
}