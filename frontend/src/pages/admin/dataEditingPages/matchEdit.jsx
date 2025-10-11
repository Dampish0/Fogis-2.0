import { Autocomplete, Box, colors, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { use } from 'react'
import { useState } from 'react';
import NavBar from '../../../components/navbar/Navbar';
import MatchBrowser from '../../../components/MatchDetails/MatchBrowser';
import useMatchStore from '../../../store/matchStore';
import useTeamStore from '../../../store/teamStore';

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

const MatchEditPage = () => {
    const [tabValue, setTabValue] = useState(0);
    const { matches, fetchMatches, fetchMatchById, match } = useMatchStore();
    const { teams, fetchTeams, loading } = useTeamStore();

    const [debounce, setDebounce] = React.useState(null);

    const [teamOptions, setTeamOptions] = useState([]);

    const [homeTeam, setHomeTeam] = useState(null);
    const [awayTeam, setAwayTeam] = useState(null);
    const [matchDate, setMatchDate] = useState(null);


    const handleTeamSearchChange = async (event) => {
        if (debounce) {
            clearTimeout(debounce);
        }
        setDebounce(setTimeout(async () => {
            await fetchTeams({  name: event.target.value, limit: 3 });
        }, 1000));
    };

    const HandleTeamSelected = (isHome, event) => {
        if (isHome) {
            setHomeTeam(teamOptions[event.target.value]);
            console.log(teamOptions[event.target.value]);
        } else {
            setAwayTeam(teamOptions[event.target.value]);
        }
    };

    useEffect(() => {
        const teamOptionsCopy = [];
        console.log(teams); 
        teams.map((team, index) => {
            const data = {label: `${team.name}`, id: team._id, key: index};
            teamOptionsCopy.push(data);
        });
        setTeamOptions(teamOptionsCopy);
    }, [teams]);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
      };

    useEffect(() => {
        fetchMatches();
    }, [fetchMatches]);

  return (
    <div style={{minHeight: '100vh'}}>
        
        <NavBar/>

        <Tabs style={{marginTop: "1vh"}} value={tabValue} onChange={handleChange} centered>
            <Tab label="Skapa Match" />
            <Tab label="Updatera Match" />
            <Tab label="Ta Bort Match" />
        </Tabs>
        <div style={{marginTop: "2vh", display: 'flex', justifyContent: 'center',
            position: 'relative', flexDirection: "row"
        }}>
            {tabValue === 0 &&<>
            <Box style={{minWidth:"30vw", minHeight:"65vh", backgroundColor: "rgb(0,0,0,0.67)", marginLeft: "2vw", borderRadius: "15px", color:"white"
                ,boxShadow: `0 4px 30px ${colors.grey[800]}`, backdropFilter: "blur(5px)", WebkitBackdropFilter: "blur(5px)",
                justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', 
            }}>
                <Typography style={{textAlign: 'center', top: '2vh', position: 'absolute'}} variant='h4'>Skapa ny match</Typography>
                <Autocomplete
                    disablePortal isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={teamOptions}
                    sx={{ width: "80%" }} 
                    onInputChange={(e) => HandleTeamSelected(true, e)}
                    loading={loading}
                    
                        renderOption={(props, option) => (
                        <li {...props} key={option.key}>
                            {option.label}
                        </li>
             )}
                    renderInput={(params) => <TextField {...params} sx={textFieldColor('white')} onChange={handleTeamSearchChange} label="Hemma lag" />}
                    />
                <Autocomplete
                    disablePortal isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={teamOptions}
                    sx={{ width: "80%", marginTop: '2vh', marginBottom: '2vh' }} 
                    onInputChange={(e) => HandleTeamSelected(false, e)}
                    loading={loading}
                    
                        renderOption={(props, option) => (
                        <li {...props} key={option.key}>
                            {option.label}
                        </li>
             )}
                    renderInput={(params) => <TextField {...params} sx={textFieldColor('white')} onChange={handleTeamSearchChange} label="borta lag" />}
                    />





            </Box></>
            }
            {tabValue === 1 && <>
            <MatchBrowser DisplayData={matches} />
                        <Box style={{minWidth:"30vw", minHeight:"65vh", backgroundColor: "rgb(0,0,0,0.67)", marginLeft: "2vw", borderRadius: "15px", color:"white"
                ,boxShadow: `0 4px 30px ${colors.grey[800]}`, backdropFilter: "blur(5px)", WebkitBackdropFilter: "blur(5px)",
                justifyContent: 'center', alignItems: 'center', display: 'flex'
            }}>
                <Typography variant='h4'>Uppdatera Match</Typography>



                </Box>
            </>
            }
            {tabValue === 2 && <>
            
            </>}
        
        </div>


    </div>
  )
}

export default MatchEditPage;