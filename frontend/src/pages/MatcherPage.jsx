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


    const teamOne = ["11 Yousif", "8 Yousef", "9 Dovkrans", "4 tyson", "7 jesús"];
    const teamTwo = ["10 Molin", "7 Svensson", "6 Karlsson", "5 rogan", "3 abdi"];
    const allEvents = ["goal", "yellow", "red", "sub", "assist", "added_time", "half_start", "half_end", "full_time"];

    const gameData = [];

    // in this format  { minute: 41, type: "goal",   player: "11 Yousif", team: "home" },
    for (let i = 0; i < 10; i++) {
        const tempdata = [];

        for (let i = 0; i < 15; i++) {
            const minute = parseInt((Math.random() * 90) +1);
            const type = allEvents[parseInt(Math.random() * allEvents.length) % (allEvents.length-4)];
            const team = Math.random() > 0.5 ? "home" : "away";
            const player = team === "home" ? teamOne[parseInt(Math.random() * teamOne.length)] : teamTwo[parseInt(Math.random() * teamTwo.length)];     
            tempdata.push({ minute, type, player, team });
        }

        for(let i = 1; i <= 2; i++) {
                if(Math.random() > 0.5) {
                    if(i == 1) {
                        tempdata.push({ minute: 45, type: "half_end" });
                    tempdata.push({ minute: 45 + parseInt(Math.random() * 5), type: "half_start" });

                    }
                    else{
                        tempdata.push({ minute: 90, type: "full_time" });
                    }
                    continue;
                }
                if(i == 1) {
                    tempdata.push({ minute: 45, type: "added_time", extra: parseInt((Math.random() * 5) +1)});

                    tempdata.push({ minute: 45, type: "half_end" });
                    tempdata.push({ minute: 45 + parseInt(Math.random() * 5), type: "half_start" });

                }
                else{
                    tempdata.push({ minute: 90, type: "added_time", extra: parseInt((Math.random() * 5) +1)});

                    tempdata.push({ minute: 90, type: "full_time" });
                }

                gameData.push({ events: tempdata , id: i, players: [...teamOne, ...teamTwo]});
        }   
    }

export const MatcherPage = () => {
    const [selectedMatchId, setSelectedMatchId] = React.useState(0);

        
    function createData(name, result, date, details, id) {
    return { name, result, date, details, id };
    }

    const handleClickArrow = (id) => {
        setSelectedMatchId(id);
    }

    const randPlaces = ["Huskvarna", "Skövde", "Jönköping", "Norrköping", "Linköping", "Stockholm"];
    const historyData = [];
    for (let i = 0; i < 10; i++) {
        const ts = Date.now() + (((parseInt((Math.random() * 10) +1) % 10) - 5) *  24 * 1000 * 60 * 60);
        historyData.push(createData(`${randPlaces[i % randPlaces.length]} vs ${randPlaces[(i + 1) % randPlaces.length]}`, `${parseInt((Math.random() * 10) +1) % 10} - ${parseInt((Math.random() * 10) +1) % 10}`, (new Date(ts)).toISOString().slice(0, 10),
        <IconButton onClick={() => handleClickArrow(i)}>
            <ArrowForwardIcon style={{ color: "white" }}/>
        </IconButton>,
        i
    ));
    }

    


    return (
        <div style={{overflow:"hidden", background: 'linear-gradient(#314158, #1c1c1c)', minHeight: "150vh" }}>
            <NavBar />
            <div>
                <MatchDetails events={gameData[selectedMatchId].events}
                players={gameData[selectedMatchId].players}
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