import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { IconButton, Paper, Tab, TableBody, Tabs } from '@mui/material';


function createData(name, result, date, details, id) {
  return { name, result, date, details, id };
}

const handleClickArrow = (id) => {
    
}
const randPlaces = ["huskvarna", "Skövde", "Jönköping", "norrköping", "Linköping", "Stockholm"];
const rows = [];
for (let i = 0; i < 10; i++) {
    const ts = Date.now() + (((parseInt((Math.random() * 10) +1) % 10) - 5) *  24 * 1000 * 60 * 60);
    rows.push(createData(`${randPlaces[i % randPlaces.length]} vs ${randPlaces[(i + 1) % randPlaces.length]}`, `${parseInt((Math.random() * 10) +1) % 10} - ${parseInt((Math.random() * 10) +1) % 10}`, (new Date(ts)).toISOString().slice(0, 10),
    <IconButton onClick={() => handleClickArrow(i)}>
        <ArrowForwardIcon style={{ color: "white" }}/>
    </IconButton>,
    i
));
}


export const MatchBrowser = (props) => {
    const [selectedTab, setSelectedTab] = React.useState(1);
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

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
        <Tabs value={selectedTab} onChange={handleChange} centered>
            <Tab style={{ color: selectedTab === 0 ? "white" : "gray"}} label="Kommande" />
            <Tab style={{ color: selectedTab === 1 ? "white" : "gray"}} label="Pågående" />
            <Tab style={{ color: selectedTab === 2 ? "white" : "gray"}} label="Avslutade" />
        </Tabs>
    <TableContainer style={{maxHeight: "clamp(300px, 200vh, 1600px)", backgroundColor: "#030712", borderRadius: "14px", border: "1px solid rgba(255, 255, 255, 0.1)"}} component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "white" }}>LAG</TableCell>
            <TableCell style={{ color: "white" }} align="right">Resultat</TableCell>
            <TableCell style={{ color: "white" }} align="right">Datum</TableCell>
            <TableCell style={{ color: "white" }} align="right">match id</TableCell>
            <TableCell style={{ color: "white" }} align="right">Se detaljer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{backgroundColor: "#1d293d"}}>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{ color: "white" }}>
                {row.name}
              </TableCell>
                <TableCell style={{ color: "white" }} align="right">{row.result}</TableCell>

              <TableCell style={{ color: "white" }} align="right">{row.date}</TableCell>
              <TableCell style={{ color: "white" }} align="right">{row.id}</TableCell>
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