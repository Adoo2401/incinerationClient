import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useStateContext } from "../contexts/ContextProvider";
import { toast } from "react-toastify";
import baseURL from "../baseURL";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AddLocation({ open, setOpen,fetchLocations }) {
  const handleClose = () => setOpen(false);
  const [data,setData] = React.useState({location:undefined,type:undefined})
  const [isDisabled, setIsDisabled] = React.useState(false)
  const {currentColor} = useStateContext()

  function handleChange(e){
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e){
      e.preventDefault();
      setIsDisabled(true)

      try {
        
        let API = await fetch(`${baseURL}/addLocation`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${sessionStorage.getItem("token")}`
            },
            body:JSON.stringify(data)
        })

        API = await API.json();

        if(API.message=="Location already exists"){
            toast.error(API.message)
            setIsDisabled(false)

        }else if(API.success){
            toast.success("Location Added")
            fetchLocations();
            setIsDisabled(false)
            setOpen(false)

        }else{
            toast.error(API.message);
            setIsDisabled(false)
        }
        

      } catch (error) {
        toast.error(error.message)
      }
      
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-4">
            <TextField
              id="standard-basic"
              label="Location"
              variant="standard"
              name="location"
              onChange={handleChange}
              required
            />
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              required
              name="type"
              id="demo-simple-select"
              label="Type"
              onChange={handleChange}
            >
              <MenuItem value={"incineration"}>Incineration</MenuItem>
              <MenuItem value={"activity"}>Activity</MenuItem>
            </Select>
            </FormControl>
          </div>
          <div className="flex justify-center mt-10">
          <Button disabled={isDisabled} type="submit" className="flex-[0.5]"  sx={{backgroundColor:currentColor}} variant='contained'>Add Location</Button>
          </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
