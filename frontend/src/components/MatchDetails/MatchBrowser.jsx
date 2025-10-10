import React from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { IconButton, InputAdornment, Paper, Tab, TableBody, Tabs, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect } from 'react';


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

export const MatchBrowser = (props) => {
  const data = props.DisplayData || [];
  const [DisplayData, setDisplayData] = React.useState(data);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedTab, setSelectedTab] = React.useState(0);
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    useEffect(() => {
        setDisplayData(data.filter((match) => {
            const status = match.status;
            if (selectedTab === 0) {
                return status === "scheduled";
            }
            else if (selectedTab === 1) {
                return (status === "in_progress" || status === "pending_completion" || status === "delayed");
            }
            else if (selectedTab === 2) {
                return status === "completed" || status === "canceled";
            }
        }));
    }, [data, selectedTab]);

  return (
    <div style={{...props.style,
        width: "clamp(720px, 46vw, 1200px)",
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
      
       label="Sök match...." fullWidth style={{ color: "white", borderRadius: "34px" }}  sx={{ mb: 2, ...textFieldColor("white")}}
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


        <Tabs value={selectedTab} onChange={handleChange} centered>
            <Tab style={{ color: selectedTab === 0 ? "white" : "gray"}} label="Kommande" />
            <Tab style={{ color: selectedTab === 1 ? "white" : "gray"}} label="Pågående" />
            <Tab style={{ color: selectedTab === 2 ? "white" : "gray"}} label="Avslutade" />
        </Tabs>
    <TableContainer style={{maxHeight: "clamp(300px, 200vh, 1600px)", backgroundColor: "#030712", borderRadius: "14px", border: "1px solid rgba(255, 255, 255, 0.1)"}} component={Paper}>
      <Table sx={{ minWidth: 500 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "white" }}>LAG</TableCell>
            {selectedTab > 0 && <TableCell style={{ color: "white" }} align="right">Resultat</TableCell>}
            <TableCell style={{ color: "white" }} align="right">Datum</TableCell>
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
                {selectedTab > 0 && <TableCell style={{ color: "white" }} align="right">{row.result}</TableCell>}

                <TableCell style={{ color: "white" }} align="right">
                  {(() => {
                    const matchDate = new Date(row.date);
                    if (row.time) {
                      matchDate.setHours(Number(row.time.slice(0, 2)));
                      matchDate.setMinutes(Number(row.time.slice(3, 5)));
                    }
                    const now = new Date();
                    const isToday =
                      matchDate.getDate() === now.getDate() &&
                      matchDate.getMonth() === now.getMonth() &&
                      matchDate.getFullYear() === now.getFullYear();

                    const timeStr = matchDate
                      .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    if (isToday) {
                      return `Idag ${timeStr}`;
                    } else {
                      return `${matchDate.toLocaleDateString()} ${timeStr}`;
                    }
                  })()}
                </TableCell>

              {/* <TableCell style={{ color: "white" }} align="right">{row.id}</TableCell> */}
              <TableCell style={{ color: "white" }} align="right">{row.details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default MatchBrowser