import React from 'react'
import LineupsCard from '../../MatchDetails/LineupsCard'
import { Button, List, ListItem, Typography } from '@mui/material'
import EIF from '../../../assets/EIF.png'
import { useNavigate } from 'react-router'

export const TeamDetailsCard = (props) => {
    const navigate = useNavigate();
    const { teamName="Borås IF", teamId="68e6a7e2bd5bf4e083b83f0f", teamlogo, latestMatches, bestScorers, wins, losses, defeats } = props;
    const recentMatches = [
    { opponent: "Göteborg FC", result: "Vinst", score: "2-1" },
    { opponent: "Stockholm United", result: "Förlust", score: "0-3" },
    { opponent: "Malmö BK", result: "Oavgjord", score: "1-1" },
    ];
    const topScorers = [
    { name: "Anna Svensson", goals: 12 },
    { name: "Erik Johansson", goals: 9 },
    { name: "Sara Nilsson", goals: 7 },
    ];
  return (
    <div style={{...props.style,
        backgroundColor: "rgba(30, 30, 30, 0.7)",
        borderRadius: "14px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.7)",
        position: "relative",
        width:"46vw",
        aspectRatio: "1/2",
        maxHeight: "85vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        display: "flex",
        padding: "20px",
        marginBottom: "40px",
        
    }}>
        <img src={EIF} alt="Team Logo" style={{width: "120px", height: "120px", position: "absolute", top: "20px", right: "20px", borderRadius: "50%"}}/>
        <Typography variant='h3' style={{textAlign:"center",position: "relative", color: "white", fontWeight: "bold"}}>
            {teamName}
        </Typography>
        <Typography variant='h4' style={{textAlign:"center",position: "relative", marginTop:"20px", color: "white" }}>
            Lag inställningar
        </Typography>

        <div style={{display: 'flex', marginTop:"20px", flexDirection: "row"}}>
        <Typography variant='h5' style={{textAlign:"center",  color: "white" }}>
            Vinster: 43
        </Typography>
        <Typography variant='h5' style={{textAlign:"center", marginLeft: "20px",  color: "white"}}>
            |
        </Typography>
        <Typography variant='h5' style={{textAlign:"center" , marginLeft: "20px",  color: "white" }}>
            Oavgjorda: 12
        </Typography>
        <Typography variant='h5' style={{textAlign:"center", marginLeft: "20px",  color: "white"}}>
            |
        </Typography>
        <Typography variant='h5' style={{textAlign:"center", marginLeft: "20px",  color: "white"}}>
            Förluster: 204
        </Typography>
        </div>

            <div style={{marginTop: "40px", textAlign: "center",        alignItems: "center", justifyContent: "center", width: "100%"}}>
                <Typography variant="h5" style={{color: "white", marginBottom: "10px"}}>Senaste matcher</Typography>
                <List style={{color: "white", textAlign: "center", alignItems: "center", justifyContent: "center", }}>
                    {recentMatches.map((m, i) => (
                    <ListItem style={{ textAlign: "center", alignItems: "center", justifyContent: "center",}} key={i}>{m.opponent}: {m.result} ({m.score})</ListItem>
                    ))}
                </List>
                <Typography variant="h5" style={{alignItems: "center",color: "white", marginTop: "20px", marginBottom: "10px"}}>Toppmålskyttar</Typography>
                <List style={{color: "white"}}>
                    {topScorers.map((p, i) => (
                       <ListItem style={{ textAlign: "center", alignItems: "center", justifyContent: "center",}} key={i}>{p.name}: {p.goals} mål</ListItem>
                    ))}
                </List>
            </div>

        <Button onClick={() => navigate(`/admin/team/edit/lineup/${teamId}`)} variant="contained" size='large' style={{position: "relative", marginTop: "100px", backgroundColor: "#1976d2", color: "white", fontWeight: "bold"}}>
            Ändra laguppställning
        </Button>
        <Button onClick={() => navigate(`/admin/team/edit/squad/${teamId}`)} variant="contained" size='large' style={{position: "relative",marginTop: "20px",  backgroundColor: "#1976d2", color: "white", fontWeight: "bold"}}>
            Ändra trupp
        </Button>
    </div>
  )
}
