import React from 'react'
import NavBar from '../../../components/Navbar/NavBar';
import { TeamBrowser } from '../../../components/adminPages/teamPages/teamBrowser';
import useTeamStore from '../../../store/teamStore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CircularProgress, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { TeamDetailsCard } from '../../../components/adminPages/teamPages/teamDetailsCard';
import useAuthStore from '../../../store/authStore';
import toast from 'react-hot-toast';

const createData = (name, player=[], id, plCount, details) => {
    return { name, player, id, plCount, details };
}

const TeamEditPage = () => {
  const { teams, fetchTeams, createTeam, team } = useTeamStore();
  const [selectedTeam, setSelectedTeam] = React.useState(0);
  const [data, setData] = React.useState([]);
  const { user } = useAuthStore();

  const handleClick = (i, id) => {
    setSelectedTeam(i);
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
      teamData.push(createData(team.name, team.players, team._id, team.players.length, detail));
    });
    setData(teamData);
  }, [teams]);
  
  const createTeamFunc = async (data) => {
    if(user == null)
{      return;}
        const packet = { name: data.name, clubId: user.clubId, ageGroup:"divison 12", players: [], logo: null, address: "thailand", homeArena: null };
    await createTeam(packet);
 
 
  }

  useEffect(() => {
    if(team){
          const detail = (<IconButton onClick={() => handleClick(data.length+1, team._id)}>
            <ArrowForwardIcon style={{ color: "white" }}/>
        </IconButton>); 
      setData(prev => [...prev, createData(team.name, team.players, team._id, detail)]);
      toast.success("Lag skapat!");
    }
  }, [team]);

  if(data.length === 0){
    return (
      <div style={{minHeight:"100vh"}}>
        <NavBar />
        <CircularProgress style={{position: "absolute", top: "50%", left: "50%"}} />
      </div>
    )
  }

  return (
    <div style={{minHeight:"100vh"}}>
      <NavBar />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start'}}>
        <TeamBrowser DisplayData={data} createFunc={createTeamFunc} style={{marginTop: '10vh' }}/>
        <TeamDetailsCard teamName={data[selectedTeam].name} teamId={data[selectedTeam].id} style={{marginTop: '10vh', marginLeft: '2vw', }}/>
      </div>

    </div>
  )
}

export default TeamEditPage;