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
import topDownPitch from '../../assets/fieldTopDown.png';
import { Avatar, Typography } from '@mui/material';



export const MatchDetails = (props) => {

    const [activeTab, setActiveTab] = React.useState('matchFacts');

    /* mockdata, ta bort senare och hämta från databas*/
    const events = props.events || [];
    const players = props.players || [];


    const renderTabContent = () => {
        switch (activeTab) {
            case 'lineups':
                return <LineUpFeature players={players} />;
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

const teamPosOne = {   
  "11": { top: '90%', left: '50%' }, 
  "8": { top: '80%', left: '60%' },    
  "9": { top: '80%', left: '40%' },    
  "4": { top: '65%', left: '35%' },  
  "7": { top: '65%', left: '65%' },  
};
const teamPosTwo = {
  "10": { top: '10%', left: '50%' },
  "6": { top: '35%', left: '42%' },  
  "5": { top: '35%', left: '58%' },   
  "3": { top: '20%', left: '40%' }, 
  "7": { top: '20%', left: '60%' },  
}
const teamOne = ["11 Yousif", "8 Yousef", "9 Dovkrans", "4 tyson", "7 jesús"];
const teamTwo = ["10 Molin", "7 Svensson", "6 Karlsson", "5 rogan", "3 abdi"];
const LineUpFeature = ({ players }) => {
  const [mouseOverPlayer, setMouseOverPlayer] = React.useState(null);

        let posSelected;
        if (mouseOverPlayer && teamOne.includes(mouseOverPlayer)) {
          posSelected = teamPosOne[mouseOverPlayer.split(' ')[0]] || { top: '90%', left: '90%' };
        } else if(mouseOverPlayer) {
          posSelected = teamPosTwo[mouseOverPlayer.split(' ')[0]] || { top: '90%', left: '90%' };
        }
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    }}>
      {mouseOverPlayer && <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '8px',
          position: 'absolute',
          top: posSelected.top,
          left: posSelected.left,
          transform: 'translate(-50%, -120%)',
          color: 'white',
          borderRadius: '8px',
          zIndex: 3,
          pointerEvents: 'none',
        }}>
          <Typography
              variant="h6"
            >
          {mouseOverPlayer}
            </Typography>

              </div>}
              
      <img src={topDownPitch} alt="Football Pitch" style={{height: 'clamp(300px, 70vh, 600px)', alignSelf: 'center', margin: 'auto' }} />
      {players.map((p, idx) => {
      const num = p.split(' ')[0];
        let pos;
        if (teamOne.includes(p)) {
          pos = teamPosOne[num] || { top: '90%', left: '90%' };
        } else {
          pos = teamPosTwo[num] || { top: '90%', left: '90%' };
        }
        return(<Avatar
          onMouseLeave={() => {
            setMouseOverPlayer(null);
          }}
          
           onMouseOver={() => {
            setMouseOverPlayer(p);
          }}  
          
          key={idx}
          style={{
            position: 'absolute',
            width: '40px',
            height: '40px',
            backgroundColor: 'black',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
            top: pos.top,
            left: pos.left,
            transform: 'translate(-50%, -50%)',
            border: '2px solid white',
            zIndex: 2,
          }}
        >
          {p.split(' ')[0]}
        </Avatar>)
  })}
    </div>
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

      const isAway = e.team == "away"; 

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
      className={`tl-row ${e.type === "assist" ? "assist" : ""} ${assistUnderGoal ? "assist-compact" : ""} ${isAway ? "away-event" : ""}`}
      key={idx}
    >
      {isAway ? (
        <>
          {/* Away: minute left, text right */}
          {e.type === "assist" ? (
            <div className="tl-left tl-right-hidden" />
          ) : (
            <div className="tl-left">{e.minute}’</div>
          )}
          <div className="tl-center">
            <div className="tl-center">
              {(e.type === "goal" || e.type === "yellow" || e.type === "red" || e.type === "sub") && (
                <span className="tl-dot"></span>
              )}
            </div>
          </div>
          <div className="tl-right">{leftText}</div>
        </>
      ) : (
        <>
          {/* Home: text left, minute right */}
          <div className="tl-left">{leftText}</div>
          <div className="tl-center">
            <div className="tl-center">
              {(e.type === "goal" || e.type === "yellow" || e.type === "red" || e.type === "sub") && (
                <span className="tl-dot"></span>
              )}
            </div>
          </div>
          {e.type === "assist" ? (
            <div className="tl-right tl-right-hidden" />
          ) : (
            <div className="tl-right">{e.minute}’</div>
          )}
        </>
      )}
    </div>
        );
      })}
    </div>
  );
}


export default MatchDetails;