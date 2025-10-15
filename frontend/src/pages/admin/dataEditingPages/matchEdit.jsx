import { Autocomplete, Box, Button, CircularProgress, colors, IconButton, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { use } from 'react'
import { useState } from 'react';
import NavBar from '../../../components/navbar/Navbar';
import MatchBrowser from '../../../components/MatchDetails/MatchBrowser';
import useMatchStore from '../../../store/matchStore';
import useRefereeStore from '../../../store/refereeStore';
import useArenaStore from '../../../store/arenaStore';
import useTeamStore from '../../../store/teamStore';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import toast from 'react-hot-toast';
import useSeriesStore from '../../../store/seriesStore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import dayjs from 'dayjs';

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

function createData(name, status, result, date, time, details, id) {
    return { name, status, result, date, time, details, id };
}

const MatchEditPage = (props) => {
    const role = props.role;
    const [tabValue, setTabValue] = useState(0);
    const { matches, fetchMatches, fetchMatchById, match, createMatch, matchloading } = useMatchStore();
    const { teams, fetchTeams, loading } = useTeamStore();
    const { referees, fetchReferees } = useRefereeStore();
    const { arenas, fetchArenas } = useArenaStore();
    const { seriesList, fetchSeries } = useSeriesStore();

    const [debounce, setDebounce] = React.useState(null);

    const [teamOptions, setTeamOptions] = useState([]);
    const [arenaOptions, setArenaOptions] = useState([]);
    const [refereeOptions, setRefereeOptions] = useState([]);
    const [seriesOptions, setSeriesOptions] = useState([]);

    const [homeTeam, setHomeTeam] = useState(null);
    const [awayTeam, setAwayTeam] = useState(null);
    const [matchDate, setMatchDate] = useState(null);
    const [selectedArena, setSelectedArena] = useState(null);
    const [selectedReferee, setSelectedReferee] = useState(null);
    const [selectedSeries, setSelectedSeries] = useState(null);

    useEffect(() => {
        fetchTeams({ limit: 5 });
    }, [fetchTeams]);

    const handleClickArrow = async (selectedNum, id) => {
        await fetchMatchById(id);
    }

    useEffect(() => {
        // set all options to the data in match when match changes
        if (match) {
            const home = match.homeTeam ? {label: match.homeTeam.name, id: match.homeTeam._id} : null;
            const away = match.awayTeam ? {label: match.awayTeam.name, id: match.awayTeam._id} : null;
            const arena = match.arena ? {label: match.arena.name, id: match.arena._id} : null;
            const referee = match.referees && match.referees.length > 0 && match.referees[0].referee ? {label: match.referees[0].referee.name, id: match.referees[0].referee._id, preferedRefereeType: match.referees[0].referee.PreferedRefereeType, refDOB: match.referees[0].referee.dateOfBirth} : null;
            const series = match.series ? {label: `${match.series.name} (${match.series.level})`, id: match.series._id} : null;
            setHomeTeam(home);
            setAwayTeam(away);
            setMatchDate(match.date ? dayjs(match.date) : null);
            setSelectedArena(arena);
            setSelectedReferee(referee);
            setSelectedSeries(series);
        }
    }, [match]);

    const historyData = matches.map((match, index) => createData(
        `${match.homeTeam.name} - ${match.awayTeam.name}`, 
        match.status,
        `${match.score.home} - ${match.score.away}`,
        (new Date(match.date)).toISOString().slice(0, 10),
        (new Date(match.date)).toISOString().slice(11, 16),
        <IconButton onClick={() => handleClickArrow(index, match._id)}>
            <ArrowForwardIcon style={{ color: "white" }}/>
        </IconButton>
        ,
        match._id
    ));


    const handleCreateMatch = async () => {
        if(!homeTeam || !awayTeam || !matchDate || !selectedArena || !selectedReferee){
            toast.error("Vänligen fyll i alla obligatoriska fält (hemma lag, borta lag, match datum, arena, domare)");
            console.error("Missing fields:", {homeTeam, awayTeam, matchDate, selectedArena, selectedReferee});
            return;
        } 
        try {
            await createMatch({
                homeTeam: homeTeam.id,
                awayTeam: awayTeam.id,
                matchDate: matchDate,
                arena: selectedArena.id,
                referees: [{
                        referee: selectedReferee.id,
                        refereeType: selectedReferee.preferedRefereeType
                    }],
            });
            toast.success("Match skapad!");
        } catch (error) {
            toast.error("Misslyckades att skapa match");
            console.error("Error creating match:", error);
        }
    };

    const handleTeamSearchChange = async (event, func) => {
        if (debounce) {
            clearTimeout(debounce);
        }
        setDebounce(setTimeout(async () => {
            if(event.target.value.trim() === ""){
                await func({ limit: 5 });
            } else {
                await func({  name: event.target.value, limit: 3 });
            }
        }, 1000));
    };

    const HandleTeamSelected = (isHome, event) => {
        if (isHome === true) {
            setHomeTeam(teamOptions[event.target.value]);
            console.log(teamOptions[event.target.value]);
        } else {
            console.log("chosne", teamOptions[event.target.value]);
            setAwayTeam(teamOptions[event.target.value]);
        }
    };

    const handleTeamSelected2 = (isHome, event, value) => {
        if (isHome) {
            setHomeTeam(value);
            console.log(value);
        } else {
            setAwayTeam(value);
        }
    };

    useEffect(() => {
        const teamOptionsCopy = [];
        teams.map((team, index) => {
            const data = {label: `${team.name}`, id: team._id, key: index};
            teamOptionsCopy.push(data);
        });
        setTeamOptions(teamOptionsCopy);
    }, [teams]);

    useEffect(() => {
        const seriesOptionsCopy = [];
        seriesList.map((serie, index) => {
            const data = {label: `${serie.name} (${serie.level})`, id: serie._id, key: index};
            seriesOptionsCopy.push(data);
        });
        setSeriesOptions(seriesOptionsCopy);
    }, [seriesList]);

    useEffect(() => {
        const arenaOptionsCopy = [];
        arenas.map((arena, index) => {
            const data = {label: `${arena.name}`, id: arena._id, key: index};
            arenaOptionsCopy.push(data);
        });
        setArenaOptions(arenaOptionsCopy);
    }, [arenas]);

    useEffect(() => {
        const refereeOptionsCopy = [];
        referees.map((referee, index) => {
            const data = {label: `${referee.name} (${referee.PreferedRefereeType})`, refDOB: referee.dateOfBirth, preferedRefereeType: referee.PreferedRefereeType, DOB: new Date(referee.dateOfBirth).toLocaleDateString(), id: referee._id, key: index};
            refereeOptionsCopy.push(data);
        });
        setRefereeOptions(refereeOptionsCopy);
    }, [referees]);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);

        // Clear all fields when switching tabs
        setHomeTeam(null);
        setAwayTeam(null);
        setMatchDate(null);
        setSelectedArena(null);
        setSelectedReferee(null);
        clearTimeout(debounce);
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
                    loadingText={
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
                            <CircularProgress size={24} sx={{ mr: 2 }} />
                            Laddar serier...
                        </Box>
    }
                    disablePortal isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={teamOptions}
                    sx={{ width: "80%" }} 
                    onInputChange={(e, value) => HandleTeamSelected(true, e)}
                    loading={loading}   
                    
                        renderOption={(props, option) => (
                        <li {...props} key={option.key}>
                            {option.label}
                        </li>
             )}
                    renderInput={(params) => <TextField {...params} sx={textFieldColor('white')} onChange={(e) => handleTeamSearchChange(e, fetchTeams)} label="Hemma lag" />}
                    />
                <Autocomplete
                        loadingText={
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
                            <CircularProgress size={24} sx={{ mr: 2 }} />
                            Laddar serier...
                        </Box>
                    }
                    disablePortal isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={teamOptions}
                    sx={{ width: "80%", marginTop: '2vh', marginBottom: '2vh' }} 
                    onInputChange={(e, value) => HandleTeamSelected(false, e)}
                    loading={loading}
                    
                        renderOption={(props, option) => (
                        <li {...props} key={option.key}>
                            {option.label}
                        </li>
                    )}
                    renderInput={(params) => <TextField {...params} sx={textFieldColor('white')} onChange={(e) => handleTeamSearchChange(e, fetchTeams)} label="borta lag" />}
                    />
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DateTimePicker
                    renderInput={(props) => <TextField {...props} variant="outlined" sx={{...dateTimeColor('white'), width: "80%", color:'white'}} />}
                    label="Match Datum" 
                    name='startDate'
                    sx={{color:'white', width: "80%"}}
                    ampm={false}
                    value={matchDate}
                    onChange={(newValue) => {
                        setMatchDate(newValue);
                    }}
                    />

                 </LocalizationProvider>

                    <Autocomplete
                        loadingText={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
            <CircularProgress size={24} sx={{ mr: 2 }} />
            Laddar serier...
        </Box>
    }
                    disablePortal isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={arenaOptions}
                    sx={{ width: "80%", marginTop: '2vh', marginBottom: '2vh' }} 
                    onInputChange={(e, value) => setSelectedArena(arenaOptions[e.target.value])}
                    loading={loading}
                    renderOption={(props, option) => (
                        <li {...props} key={option.key}>
                            {option.label}
                        </li>
                    )}
                    renderInput={(params) => <TextField {...params} sx={textFieldColor('white')} onChange={(e) => handleTeamSearchChange(e, fetchArenas)} label="Välj arena" />}
                    />
                
                    <Autocomplete
                        loadingText={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
            <CircularProgress size={24} sx={{ mr: 2 }} />
            Laddar serier...
        </Box>
    }
                    disablePortal isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={refereeOptions}
                    sx={{ width: "80%", marginBottom: '2vh' }} 
                    onInputChange={(e, value) => setSelectedReferee(refereeOptions[e.target.value])}
                    loading={loading}
                    
                        renderOption={(props, option) => (
                        <li {...props} key={option.key}>
                            {option.label} <span style={{ marginLeft: 'auto', color: '#ccc', fontSize: '0.9em' }}>{new Date(option.refDOB).toLocaleDateString()}</span>
                        </li>
                    )}
                    renderInput={(params) => <TextField {...params} sx={textFieldColor('white')} onChange={(e) => handleTeamSearchChange(e, fetchReferees)} label="Välj domare" />}
                    />

                    <Autocomplete
                        loadingText={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
            <CircularProgress size={24} sx={{ mr: 2 }} />
            Laddar serier...
        </Box>
    }
                    disablePortal isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={seriesOptions}
                    sx={{ width: "80%", marginBottom: '2vh' }} 
                    onInputChange={(e, value) => setSelectedSeries(seriesOptions[e.target.value])}
                    loading={loading}
                    
                        renderOption={(props, option) => (
                        <li {...props} key={option.key}>
                            {option.label}
                        </li>
                    )}
                    renderInput={(params) => <TextField {...params} sx={textFieldColor('white')} onChange={(e) => handleTeamSearchChange(e, fetchSeries)} label="Välj serie" />}
                    />

                <Button variant='contained' onClick={() => handleCreateMatch()} style={{backgroundColor: colors.green[700]}}>{matchloading && <CircularProgress size={24} />}{!matchloading && "Skapa Match"}</Button>


            </Box></>
            // UPDATE MATCH -------------------------------------------------------------------
            }
            {tabValue === 1 && <>
            <MatchBrowser DisplayData={historyData} />
                        <Box style={{minWidth:"30vw", minHeight:"65vh", backgroundColor: "rgb(0,0,0,0.67)", marginLeft: "2vw", borderRadius: "15px", color:"white"
                ,boxShadow: `0 4px 30px ${colors.grey[800]}`, backdropFilter: "blur(5px)", WebkitBackdropFilter: "blur(5px)",
                justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column',
            }}>
                <Typography style={{textAlign: 'center', top: '2vh', position: 'absolute'}} variant='h4'>Uppdatera Match</Typography>
                    <Autocomplete
                    value={homeTeam}
                    disablePortal isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={teamOptions}
                    sx={{ width: "80%" }} 
                    onInputChange={(e, value) => handleTeamSelected2(true, e, value)}
                    loading={loading}
                    
                        renderOption={(props, option) => (
                        <li {...props} key={option.key}>
                            {option.label}
                        </li>
             )}
                    renderInput={(params) => <TextField {...params} sx={textFieldColor('white')} onChange={(e) => handleTeamSearchChange(e, fetchTeams)} label="Hemma lag" />}
                    />
                <Autocomplete
                    value={awayTeam}
                    disablePortal isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={teamOptions}
                    sx={{ width: "80%", marginTop: '2vh', marginBottom: '2vh' }} 
                    onInputChange={(e, value) => handleTeamSelected2(false, e, value)}
                    loading={loading}
                    
                        renderOption={(props, option) => (
                        <li {...props} key={option.key}>
                            {option.label}
                        </li>
                    )}
                    renderInput={(params) => <TextField {...params} sx={textFieldColor('white')} onChange={(e) => handleTeamSearchChange(e, fetchTeams)} label="borta lag" />}
                    />
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DateTimePicker
                    value={matchDate}
                    renderInput={(props) => <TextField {...props} variant="outlined" sx={{...dateTimeColor('white'), width: "80%", color:'white'}} />}
                    label="Match Datum" 
                    name='startDate'
                    sx={{color:'white', width: "80%"}}
                    ampm={false} 
                    onChange={(newValue) => {
                        setMatchDate(newValue);
                    }}
                    />

                 </LocalizationProvider>

                    <Autocomplete
                    value={selectedArena}
                    disablePortal isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={arenaOptions}
                    sx={{ width: "80%", marginTop: '2vh', marginBottom: '2vh' }} 
                    onInputChange={(e, value) => setSelectedArena(value )}
                    loading={loading}
                    renderOption={(props, option) => (
                        <li {...props} key={option.key}>
                            {option.label}
                        </li>
                    )}
                    renderInput={(params) => <TextField {...params} sx={textFieldColor('white')} onChange={(e) => handleTeamSearchChange(e, fetchArenas)} label="Välj arena" />}
                    />
                
                    <Autocomplete
                    value={selectedReferee}
                    disablePortal isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={refereeOptions}
                    
                    sx={{ width: "80%", marginBottom: '2vh' }} 
                    onInputChange={(e, value, v) => setSelectedReferee(value)}
                    loading={loading}
                    
                        renderOption={(props, option) => (
                        <li {...props} key={option.key}>
                            {option.label} <span style={{ marginLeft: 'auto', color: '#ccc', fontSize: '0.9em' }}>{new Date(option.refDOB).toLocaleDateString()}</span>
                        </li>
                    )}
                    renderInput={(params) => <TextField {...params} sx={textFieldColor('white')} onChange={(e) => handleTeamSearchChange(e, fetchReferees)} label="Välj domare" />}
                    />

                    <Autocomplete
                    value={selectedSeries}
                    disablePortal isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={seriesOptions}
                    sx={{ width: "80%", marginBottom: '2vh' }} 
                    onInputChange={(e, value) => setSelectedSeries(value)}
                    loading={loading}
                    
                        renderOption={(props, option) => (
                        <li {...props} key={option.key}>
                            {option.label} (<span style={{ marginLeft: 'auto', color: '#ccc', fontSize: '0.9em' }}>{new Date(option.startDate).toLocaleDateString()}</span>)
                        </li>
                    )}
                    renderInput={(params) => <TextField {...params} sx={textFieldColor('white')} onChange={(e) => handleTeamSearchChange(e, fetchSeries)} label="Välj serie" />}
                    />

                <Button variant='contained' onClick={() => handleUpdateMatch()} style={{backgroundColor: colors.green[700]}}>{matchloading && <CircularProgress size={24} />}{!matchloading && "Uppdatera Match"}</Button>



                </Box>
            </>
            // DELETE MATCH ------------------------------------------------------------------- 
            }
            {tabValue === 2 && <>
            
            </>}
        
        </div>


    </div>
  )
}

export default MatchEditPage;