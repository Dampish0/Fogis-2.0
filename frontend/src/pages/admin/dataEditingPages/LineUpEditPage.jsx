import React from 'react'
import useTeamStore from '../../../store/teamStore';
import { useEffect } from 'react';
import PlayerBrowser from '../../../components/adminPages/teamPages/playerBrowser';
import NavBar from '../../../components/navbar/Navbar';
import LineupsEditor from '../../../components/adminPages/teamPages/LineupsEditor';
import { Button, Typography } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import toast from 'react-hot-toast';

export const LineUpEditPage = () => {
    const teamId = window.location.pathname.split('/').pop();
    const { team, fetchTeamById } = useTeamStore();
    const [players, setPlayers] = React.useState([]);
    const [fetchedTeam, setFetchedTeam] = React.useState(false);
    const [lineup, setLineup] = React.useState([]); // placed players on pitch
    const playerList = [
        { name: "Christiano Ronaldo", preferedPosition: "Forward", number: 9, id: "1" },
        { name: "Diego Maradona", preferedPosition: "Forward", number: 9, id: "5" },
        { name: "Joseph Joestar", preferedPosition: "Mittfältare", number: 8, id: "2" },
        { name: "Mike Hawk", preferedPosition: "Försvarare", number: 5, id: "3" },
        { name: "Dixie Rect", preferedPosition: "Målvakt", number: 1, id: "4" },
    ];
    const MAX_PLAYERS = 11;
    const GK_ZONE_WIDTH = 0.15;

    useEffect(() => {
        if (teamId) {
            fetchTeamById(teamId);
        }
    }, [teamId, fetchTeamById]);

    useEffect(() => {
        setPlayers(team?.players || playerList);
        setLineup(team?.lineup || []);
        setFetchedTeam(team);

    }, [team]);

    const handleAddOrMovePlayer = (player, coordinates) => {
    setLineup(prev => {
        const pid = player._id || player.id;
        const existing = prev.find(p => (p.player._id || p.player.id) === pid);

        // Determine position
        let position = player.preferedPosition;
        if (coordinates.gk) position = "GK";

        // Only one GK allowed
        if (position === "GK") {
            const gkExists = prev.some(p => p.position === "GK" && (p.player._id || p.player.id) !== pid);
            if (gkExists) {
                //toast.error("Endast en målvakt tillåten!");
                return prev;
            }
        }

        if (!existing && prev.length >= MAX_PLAYERS) {
            toast.error(`Max antal spelare (${MAX_PLAYERS}) nått! Ta bort en spelare först.`);
            return prev;
        }

        if (existing) {
            return prev.map(p =>
                (p.player._id || p.player.id) === pid
                    ? { ...p, coordinates, position }
                    : p
            );
        }
        return [...prev, { player, position, coordinates }];
    });
};

    const handleRemovePlayer = (player) => {
        setLineup(prev => prev.filter(p => (p.player._id || p.player.id) !== (player._id || player.id)));
    };

    const saveChanges = async () => {
        try {
            console.log("Saving lineup:", lineup);
            toast.success("Laguppställning sparad!");
        }
        catch (error) {
        }
    };

  return (
    <div style={{minHeight: "100vh"}}>
        <NavBar/>
        <DndProvider backend={HTML5Backend}>
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
                       <div style={{
                           position:"absolute", top:"20px", backgroundColor: "rgb(0, 0, 0, 0.5)", marginTop: "5%", marginBottom: "5%", padding: "5px",
                           maxWidth: "85%", marginLeft: "auto", marginRight: "auto", borderRadius: "10px", boxShadow: '0 24px 48px rgba(0,0,0,0.5)'
                       }}>
                           <Typography variant="h4" style={{ textAlign: 'center',padding:"10px", color: 'white' }}>Redigera laguppställning för {fetchedTeam ? fetchedTeam.name : "Laddar..."}</Typography>
                       </div> 
                        <Button onClick={() => saveChanges()} variant='contained' color='success' size='large' style={{fontSize:"20px", borderRadius:"12px", boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', position:"absolute", top:"20px", right:"20px", zIndex: 11}}>Spara</Button>
                       
                <LineupsEditor
                    homeTeam={team}
                    awayTeam={null}
                    homeTeamLineup={lineup}
                    awayTeamLineup={[]}
                    oneTeam={true}
                    ignoreExtras={true}
                    onAddOrMovePlayer={handleAddOrMovePlayer}
                    onRemovePlayer={handleRemovePlayer}
                />
            </div>
        </div>
        </DndProvider>
    </div>
  )
} 

export default LineUpEditPage;