import Container from '@mui/material/Container'
import React from 'react'
import NavBar from '../components/Navbar/NavBar.jsx'
import ListMUI from '../components/ListMUI.jsx'
import { Button, Divider, TextareaAutosize, Typography } from '@mui/material'
import MatchCard from "../components/MatchDetails/MatchCard";
import MatchDetails from "../components/MatchDetails/MatchDetails";
import SearchBar from '../components/SearchBar.jsx'
import MatchField from '../components/MatchDetails/MatchField.jsx'
import MatchBrowser from '../components/matchdetails/MatchBrowser.jsx'



function MatcherPage() {
    return (
        <div style={{ background: 'linear-gradient(#314158, #1c1c1c)', minHeight: "150vh" }}>
            <NavBar />
            <div>
                <MatchDetails />
            </div>
            <SearchBar />
            <div>
                <MatchBrowser style={{ marginTop: "20px", left: "2vw", position:"relative", maxWidth: "45vw" }}></MatchBrowser>
            </div>
        </div>
    );
}




export default MatcherPage;