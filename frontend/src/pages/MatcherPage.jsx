import Container from '@mui/material/Container'
import React from 'react'
import NavBar from '../components/Navbar/NavBar.jsx'
import ListMUI from '../components/ListMUI.jsx'
import { Button, Divider, TextareaAutosize, Typography } from '@mui/material'
import MatchCard from "../components/MatchDetails/MatchCard";
import MatchDetails from "../components/MatchDetails/MatchDetails";
import SearchBar from '../components/SearchBar.jsx'
import MatchField from '../components/MatchDetails/MatchField.jsx'
import MatchBrowser from '../components/MatchDetails/MatchBrowser.jsx'
import { IconButton, InputAdornment, Paper, Tab, TableBody, Tabs, TextField } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useMatchStore from '../store/matchStore.js'
import { useState } from 'react'
import { useEffect } from 'react'


export const MatcherPage = () => {
    const [selectedMatchId, setSelectedMatchId] = useState(0);
    const {matches, match, fetchMatches, fetchMatchById} = useMatchStore();

    useEffect(() => {
        fetchMatches();
    }, [fetchMatches]);

    useEffect(() => {
        if (matches[selectedMatchId]?._id) {
            fetchMatchById(matches[selectedMatchId]._id);
        }
    }, [matches, selectedMatchId, fetchMatchById]);


    const gameData = matches[selectedMatchId]
        ? {
            events: matches[selectedMatchId].events,
            players: [
                ...matches[selectedMatchId].homeTeam.players,
                ...matches[selectedMatchId].awayTeam.players,
            ],
        }
        : { events: [], players: [] };

    function createData(name, status, result, date, time, details, id) {
        return { name, status, result, date, time, details, id };
    }

    const handleClickArrow = (selectedNum, id) => {
        fetchMatchById(id);
        setSelectedMatchId(selectedNum);
    }

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

    const getPlayers = () => {
        if (!match || !match.homeTeamLineup || !match.awayTeamLineup) return [];
        const allPlayers = [
            ...match.homeTeamLineup.map(lineup => ({
                ...lineup.player,
                team: match.homeTeam._id,
            })),
            ...match.awayTeamLineup.map(lineup => ({
                ...lineup.player,
                team: match.awayTeam._id,
            }))
        ];
    }


    return (
        <div style={{overflow:"hidden", backgroundColor:'white'}}>
            <NavBar />
            <div>
                <MatchDetails events={match?.events} match={match}
                homeTeamLineup={match?.homeTeamLineup} awayTeamLineup={match?.awayTeamLineup}
                //DisplayData={gameData}
                 />
            </div>
            <div>
                <MatchBrowser DisplayData={historyData} style={{ marginTop: "20px", left: "2vw", position:"relative", maxWidth: "45vw" }}></MatchBrowser>
            </div>
        </div>
    );
}




export default MatcherPage;