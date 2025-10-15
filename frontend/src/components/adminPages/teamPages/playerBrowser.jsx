import React from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { Button, IconButton, InputAdornment, Paper, Tab, TableBody, Tabs, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect } from 'react';
import { use } from 'react';
import { useDrag } from 'react-dnd';


  const textFieldColor = (color) => (
    {
                    '& label.Mui-focused': {
                    color: color,
                    },
                    '& .MuiInput-underline:after': {
                    borderBottomColor: color,
                    },
                    '& .MuiInputLabel-root': {
                    color: color,
                    },
                    '& .MuiOutlinedInput-input': {
                    color: color,
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '34px', 
                    '& fieldset': {
                        borderColor: color,
                    },
                    '&:hover fieldset': {
                        borderColor: color,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: color,
                    },
                    },
             }
  );

export const PlayerBrowser = (props) => {
  const data = props.DisplayData || [];
  const [DisplayData, setDisplayData] = React.useState(data);
    const [searchTerm, setSearchTerm] = React.useState("");

    useEffect(() => {
        setDisplayData(data.filter((team) => team.name.toLowerCase().includes(searchTerm.toLowerCase()) || team.id.toString() === searchTerm));
    },[data, searchTerm]);


  const DraggableRow = ({ row }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'PLAYER',
      item: { player: row },
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    }), [row]);
    return (
      <TableRow
        ref={drag}
        key={row._id || row.id}
        style={{ opacity: isDragging ? 0.4 : 1, cursor: 'grab' }}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row" style={{ color: "white" }}>{row.name}</TableCell>
        <TableCell style={{ color: "white" }} align="right">{row.preferedPosition}</TableCell>
        <TableCell style={{ color: "white" }} align="right">{row.number}</TableCell>
      </TableRow>
    );
  };

  return (
    <div style={{...props.style,
        width: "44vw",
        //maxHeight: "1600px",
        backgroundColor: "rgba(30, 30, 30, 0.7)",
        backdropFilter: "blur(12px)", 
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "14px",
        padding: "20px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.7)",
    }}>

      <TextField onChange={(e) => {
        setSearchTerm(e.target.value);
        setDisplayData(data.filter((match) => match.name.toLowerCase().includes(e.target.value.toLowerCase())
         || match.id.toString() === e.target.value));
      
      }}
      
       label="Sök spelare...." fullWidth style={{ color: "white", borderRadius: "34px" }}  sx={{ mb: 2, ...textFieldColor("white")}}
      slotProps={{
                    input: {
                      endAdornment: 
                      <InputAdornment position="start" style={{ color: "white" }}>


                        {searchTerm.length == 0 ? <SearchIcon /> : 
                        <IconButton onClick={() => {
                          setSearchTerm("");
                          setDisplayData(data);
                        }}>
                        <CancelIcon style={{ color: "white", marginRight: "-6px" }}/>
                        </IconButton>
                      
                      }


                        </InputAdornment>
                    }
                  }}
      >
        
      </TextField>

 
    <TableContainer style={{maxHeight: "clamp(300px, 200vh, 1600px)", backgroundColor: "#030712", borderRadius: "14px", border: "1px solid rgba(255, 255, 255, 0.1)"}} component={Paper}>
      <Table sx={{ minWidth: 500 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "white" }}>namn</TableCell>
            <TableCell style={{ color: "white" }} align="right">föredragen position</TableCell>
            <TableCell style={{ color: "white" }} align="right">nummer</TableCell>
             {/* <TableCell style={{ color: "white" }} align="right">match id</TableCell> */}
            {/* <TableCell style={{ color: "white" }} align="right">Se detaljer</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody style={{backgroundColor: "#1d293d"}}>
          {DisplayData.map(row => (
            <DraggableRow row={row} key={row._id || row.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default PlayerBrowser;