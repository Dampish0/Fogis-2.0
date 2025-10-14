import React from 'react'
import useTeamStore from '../../../store/teamStore';
import { useEffect } from 'react';
import PlayerBrowser from '../../../components/adminPages/teamPages/playerBrowser';
import NavBar from '../../../components/navbar/Navbar';
import LineupsCard from '../../../components/MatchDetails/LineupsCard';
import { Typography } from '@mui/material';

export const DND_TYPES = {
  PLAYER: 'PLAYER',
};

export const LineUpEditPage = () => {
    const teamId = window.location.pathname.split('/').pop();
    const { team, fetchTeamById } = useTeamStore();
    const [players, setPlayers] = React.useState([]);
    const playerList = [
        { name: "Spelare 1", preferedPosition: "Forward", number: 9, id: "1" },
        { name: "Spelare 2", preferedPosition: "Mittfältare", number: 8, id: "2" },
        { name: "Spelare 3", preferedPosition: "Försvarare", number: 5, id: "3" },
        { name: "Spelare 4", preferedPosition: "Målvakt", number: 1, id: "4" },
    ];

    

    useEffect(() => {
        if (teamId) {
            fetchTeamById(teamId);
            setPlayers(team?.players || playerList);
        }
    }, [teamId, fetchTeamById]);

  return (
    <div style={{minHeight: "100vh"}}>
        <NavBar/> 
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start'}}>
        <PlayerBrowser DisplayData={players} style={{marginTop: '10vh'  }}/>
            <div style={{marginTop: '10vh',
                marginLeft: '2vw',
                backgroundColor: "rgba(30, 30, 30, 0.7)",
                borderRadius: "14px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.7)",
                position: "relative",
                width:"46vw", 
                minHeight: "75vh",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                display: "flex",
                padding: "20px",


            }}>
                       <div style={{position:"absolute", top:"20px", backgroundColor: "rgb(0, 0, 0, 0.5)", marginTop: "5%", marginBottom: "5%", padding: "5px",
                           maxWidth: "85%", marginLeft: "auto", marginRight: "auto", borderRadius: "10px", boxShadow: '0 24px 48px rgba(0,0,0,0.5)'
                       }}>
                           <Typography variant="h4" style={{ textAlign: 'center',padding:"10px", color: 'white' }}>                    Redigera laguppställning för {team ? team.name : "Laddar..."}</Typography>
                       </div> 
                <LineupsCard homeTeam={team} awayTeam={null} homeTeamLineup={[]} awayTeamLineup={[]} oneTeam={true} ignoreExtras={true} />
            </div>
        </div>
        
    </div>
  )
} 

export default LineUpEditPage;