import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import { useEffect } from 'react';
import { getLocation } from '../controllers/apiController';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

const FilterLocations = ({select,setSelect}) => {

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const [locations,setLocations]=useState([]);
const [loader,setLoader]=useState(true);
const theme = useTheme();

let token=sessionStorage.getItem("token");

const fetchLocations=async()=>{
      let locations=await getLocation(token,true);
      if(locations){
        setLocations(locations);
        setLoader(false);
      }
}

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

function handleChange(event){
       
      let value=event.target.value
      setSelect(typeof value === 'string' ? value.split(',') : value);
}

useEffect(()=>{
    fetchLocations();
},[])

  return (
    <FormControl sx={{ m: 1, width: 300 }} style={{marginLeft:"20px"}}>
         <InputLabel>Select Locations</InputLabel>
         <Select value={select} onChange={handleChange} input={<OutlinedInput  label="Locations" />} labelId='demo-multiple-name-label' id="demo-multiple-name" multiple MenuProps={MenuProps}>
                   {!loader?
                        locations.map((item,index)=>(
                        <MenuItem style={getStyles(item.locations, select, theme)} key={index} value={item.location}>{item.location}</MenuItem>
                       ))
                   :null}
         </Select>
    </FormControl>
  )
}

export default FilterLocations