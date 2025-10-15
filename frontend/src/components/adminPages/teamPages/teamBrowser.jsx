import React from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { Button, IconButton, InputAdornment, Modal, Paper, Tab, TableBody, Tabs, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect } from 'react';
import { use } from 'react';
import toast from 'react-hot-toast';
import { useRef } from 'react';


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

export const TeamBrowser = (props) => {
  const data = props.DisplayData || [];
    const newPlayerFunc = props.createFunc || (() => {});
      const teamNameRef = useRef();


  const [DisplayData, setDisplayData] = React.useState(data);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [createTeamModalOpen, setCreateTeamModalOpen] = React.useState(false);

    useEffect(() => {
        setDisplayData(data.filter((team) => team.name.toLowerCase().includes(searchTerm.toLowerCase()) || team.id.toString() === searchTerm));
    },[data]);


    const handleCreateTeam = () => {
      setCreateTeamModalOpen(true);
    }

    const submitCreateTeam = async (data) => { 
      
      
      




      await newPlayerFunc(data);
      setCreateTeamModalOpen(false);
      
    }

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

    <Modal  open={createTeamModalOpen} onClose={() => setCreateTeamModalOpen(false)}>
      <div style={{  position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'rgba(30, 30, 30, 0.9)', boxShadow: "0 4px 16px rgba(0, 0, 0, 0.7)"
        ,  padding: "20px", backgroundColor: "rgba(0,0,0, 0.7)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: "8px" }}>
        <Typography sx={{color: "white"}} variant="h6">Skapa nytt lag</Typography>
        <TextField         inputRef={teamNameRef} label="Lag namn" fullWidth variant="outlined" margin="normal" sx={{...textFieldColor("white")}} />
        <Button onClick={() => submitCreateTeam({name: teamNameRef.current.value})} variant='contained' color='primary' style={{ marginTop: "20px" }}>
          Skapa
        </Button>
      </div>
    </Modal>

      <TextField onChange={(e) => {
        setSearchTerm(e.target.value);
        setDisplayData(data.filter((match) => match.name.toLowerCase().includes(e.target.value.toLowerCase())
         || match.id.toString() === e.target.value));
      
      }}
      
       label="Sök lag...." fullWidth style={{ color: "white", borderRadius: "34px" }}  sx={{ mb: 2, ...textFieldColor("white")}}
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
            <TableCell style={{ color: "white" }}>LAG</TableCell>
            <TableCell style={{ color: "white" }} align="right">antal spelare</TableCell>
             {/* <TableCell style={{ color: "white" }} align="right">match id</TableCell> */}
            <TableCell style={{ color: "white" }} align="right">Se detaljer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{backgroundColor: "#1d293d"}}>
          {DisplayData.map((row) => (

            <TableRow
              key={row._id || row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{ color: "white" }}>
                {row.name}
              </TableCell>
                <TableCell style={{ color: "white" }} align="right">
                  { row.plCount ? row.plCount : 0}
                </TableCell>

              {/* <TableCell style={{ color: "white" }} align="right">{row.id}</TableCell> */}
              <TableCell style={{ color: "white" }} align="right">{row.details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button onClick={handleCreateTeam} variant='contained' color='primary' size='large' style={{fontSize:"20px", borderRadius:"12px", boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', marginTop: "20px", width: "100%"}}>
      Skapa nytt lag
    </Button>


    </div>
  )
}

export default TeamBrowser;