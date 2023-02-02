import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function LocationData({data}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Locations</TableCell>
            <TableCell align="center">Backlog</TableCell>
            <TableCell align="center">Bags Incinerated</TableCell>
            <TableCell align="center">Waste Collected</TableCell>
            <TableCell align="center">Waste Incinerated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((element) => (
            <TableRow
              key={element.location}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {element.location.replace(/\b[a-z]/g,function(letter) {return letter.toUpperCase()})}
              </TableCell>
              <TableCell align="center">{element.backlog}</TableCell>
              <TableCell align="center">{element.bagsIncinerated}</TableCell>
              <TableCell align="center">{element.wasteCollected}</TableCell>
              <TableCell align="center">{element.weightIncinerated}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}