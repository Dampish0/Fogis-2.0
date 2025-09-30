import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import './MatchDetail.css';
import HFF from '../../assets/hff.png';
import TORD from '../../assets/Tord.png';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';



function MatchDetails({}) {

    const [activeTab, setActiveTab] = React.useState('matchFacts');

    /* mockdata, ta bort senare och hämta från databas*/
    const events = [
  { minute: 0, type: "half_start" },

  { minute: 41, type: "goal",   player: "11 Yousif", team: "home" },
  { minute: 41, type: "assist", player: "8 Yousef",  team: "home" },

  { minute: 45, type: "half_end" },
  { minute: 45, type: "added_time", extra: 2 },      // visar "+ 2"

  { minute: 78, type: "red", player: "9 Dovkrans", team: "away" },

  { minute: 90, type: "added_time", extra: 5 },      // visar "+ 5"
  { minute: 93, type: "sub",   player: "2 Molin",   team: "home" },
 

  { minute: 95, type: "full_time" },
];


    const renderTabContent = () => {
        switch (activeTab) {
            case 'lineups':
                return <div className="lineups-content">Lineups 1</div>;
            case 'matchFacts':
                return <MatchFacts events={events} />;
            case 'table':
                return <Tabell style={{ padding: '16px', maxHeight: '400px', overflowY: 'auto' }} />;
            default:
                return null;
        }
    };

    return (
        <div className="matchdetails">

            <div className="scoreboard" >
                <h3 style = {{color: "white"}}>Match Information</h3>

                <div className="score">
                    <img src={HFF} alt="HFF" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
                    <p style = {{color: "white"}}>0 - 0</p>
                    <img src={TORD} alt="TORD" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
                </div>
                <div className="teams">
                    <p style = {{color: "white"}}>Husqvarna FF</p>  <p style = {{color: "white"}}>IK Tord</p>
                </div>
            </div>
                <div className="tabs">
                    <Button 
                        onClick={() => setActiveTab('lineups')} 
                        variant={activeTab === 'lineups' ? 'contained' : 'text'}
                        className={activeTab === 'lineups' ? 'tab-button active' : 'tab-button'}
                        >Lineups</Button>
                    <Button 
                        onClick={() => setActiveTab('matchFacts')} 
                        variant={activeTab === 'matchFacts' ? 'contained' : 'text'}
                        className={activeTab ==='matchFacts' ? 'tab-button active' : 'tab-button'}
                         >Matchfakta</Button>
                    <Button
                         onClick={() => setActiveTab('table')} 
                         variant={activeTab === 'table' ? 'contained' : 'text'}
                         className={activeTab === 'table'? 'tab-button active' : 'tab-button'}
                         >Tabell</Button>
                </div>
                <div className="tab-content" style={{ margin: "20px 0", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.6)" }}>{renderTabContent()}</div>
        </div>
    );
}

function createTeam(teamname) {
  return { teamname };
}

const rows = [
  createTeam('Husqvarna FF'),
  createTeam('IK Tord'),
  createTeam('Lag 3'),
  createTeam('Lag 4'),
  createTeam('Lag 5'),
  createTeam('Lag 6'),
  createTeam('Lag 7'),
  createTeam('Lag 8'),
  createTeam('Lag 9'),
  createTeam('Lag 10'),
];

function Tabell() {
  return (
    <TableContainer component={Paper} >
      <Table >
        <TableHead style={{ backgroundColor: 'aliceblue' }}> 
          <TableRow >
            
            <TableCell>Lag</TableCell>
            <TableCell>Poäng</TableCell>
            <TableCell>Matcher</TableCell>
            <TableCell>Vunna</TableCell>
            <TableCell>Oavgjorda</TableCell>
            <TableCell>Förluster</TableCell>
            <TableCell>Målskillnad</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody style={{}}>
          {rows.map((row) => (
            <TableRow 
            key={row.teamname}
            style={{ backgroundColor: 'aliceblue', '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell components="th" scope="row">
                {row.teamname}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>  
  );
}

function MatchFacts({ events }) {
  // för strukturens skull sorterar vi stigande tid
  const sorted = [...events].sort((a, b) => b.minute - a.minute);

  // Hjälp: vilka typer ska centreras i mitten?
  const centerTypes = new Set([
    "half_start",
    "half_end",
    "full_time",
    "added_time"
  ]);

  const labelByType = {
    goal: "⚽️",
    yellow: "🟨",
    red: "🟥",
    assist: "Assist 🎯",
    sub: "🔁",
    half_start: " 🏁 ",
    half_end: " Första halvlek ",
    full_time: "Slut signal 📢",
    added_time: "+", // visas som + x
  };

  return (
    <div className="timeline">
      <div className="tl-line" aria-hidden="true"></div>

      {sorted.map((e, idx) => {
        const isCenter = centerTypes.has(e.type);
        const prev = sorted[idx - 1];
        const assistUnderGoal =
          e.type === "assist" &&
          prev &&
          prev.type === "goal" &&
          prev.minute === e.minute &&
          prev.team === e.team;

    
        if (isCenter) {
          return (
            <div className="tl-row" key={idx}>
              <div className="tl-left tl-muted"></div>
              <div className="tl-center">
                <span className="tl-dot"></span>
                <div className="tl-center-label">
                  {e.type === "added_time" ? `+ ${e.extra || e.minute}` : (labelByType[e.type] || e.label)}
                </div>
              </div>
              <div className="tl-right tl-muted"></div>
            </div>
          );
        }

    // Vanlig händelse: text vänster, minut höger
    
    const leftText = e.customText
          ? e.customText
          : `${e.player} – ${labelByType[e.type] || e.type}`;

        return (
          <div
            className={`tl-row ${e.type === "assist" ? "assist" : ""} ${assistUnderGoal ? "assist-compact" : ""}`}
            key={idx}
          >
            <div className="tl-left">{leftText}</div>

            <div className="tl-center">
              <div className="tl-center">
               {(e.type === "goal" || e.type === "yellow" || e.type === "red" || e.type === "sub") && (
               <span className="tl-dot"></span>
               )}
            </div>

            </div>

            {/* Visa ingen tid för assist */}
            {e.type === "assist" ? (
              <div className="tl-right tl-right-hidden" />
            ) : (
              <div className="tl-right">{e.minute}’</div>
            )}
          </div>
        );
      })}
    </div>
  );
}


export default MatchDetails;