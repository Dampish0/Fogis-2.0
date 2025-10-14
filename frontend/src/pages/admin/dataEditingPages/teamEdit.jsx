import React from 'react'
import NavBar from '../../../components/navbar/Navbar';
import { TeamBrowser } from '../../../components/adminPages/teamPages/teamBrowser';
import useTeamStore from '../../../store/teamStore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IconButton } from '@mui/material';
import { useEffect } from 'react';
import { TeamDetailsCard } from '../../../components/adminPages/teamPages/teamDetailsCard';


const createData = (name, player=[], id, details) => {
    return { name, player, id, details };
}

const TeamEditPage = () => {
  const { teams, fetchTeams } = useTeamStore();
  const [data, setData] = React.useState([]);

  const handleClick = (i, id) => {

  }

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    const teamData = [];
    teams.map((team, index) => {
      const detail = (<IconButton onClick={() => handleClick(index, team._id)}>
            <ArrowForwardIcon style={{ color: "white" }}/>
        </IconButton>);
      teamData.push(createData(team.name, team.players, team._id, detail));
    });
    setData(teamData);
  }, [teams]);
  


  return (
    <div style={{minHeight:"100vh"}}>
      <NavBar />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start'}}>
        <TeamBrowser DisplayData={data} style={{marginTop: '10vh', marginLeft: '2vw', }}/>
        <TeamDetailsCard style={{marginTop: '10vh', marginLeft: '2vw', }}/>
      </div>

    </div>
  )
}

export default TeamEditPage;