import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {toast} from 'react-toastify';
import baseURL from '../baseURL';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({show,setShow}) {

  const [disable,setDisabled] = React.useState(false)

  const handleClose = () => {
    setShow(false);
  };

  async function handleSend(){
     setDisabled(true)
     try {
      
      let API = await fetch(`${baseURL}/forgotPassword`);
      API = await API.json();
      
      if(API.success){
        toast.success("Email Sent successfully");
        setDisabled(false);
        setShow(false);
      }

     } catch (error) {
      toast.error(error.message);
      setDisabled(false)
     }
  }

  return (
    <div>
      <Dialog
        open={show}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Forgot Password?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            An Email will be sent to zaheer@medilandpakistan.com with reset password Link click send
            to continue. Link will expire in 1 hour.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button disabled={disable} onClick={handleSend}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}