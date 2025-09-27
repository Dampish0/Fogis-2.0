import Container from '@mui/material/Container'
import React from 'react'
import NavBar from '../components/Navbar/NavBar.jsx'
import ListMUI from '../components/ListMUI.jsx'
import { Button, Divider, TextareaAutosize, Typography } from '@mui/material'
import MatchCard from "../components/MatchDetails/MatchCard";
import MatchDetails from "../components/MatchDetails/MatchDetails";
import SearchBar from '../components/SearchBar.jsx'
import MatchField from '../components/MatchDetails/MatchField.jsx'



function MatcherPage() {
    return (
        <div style={{ backgroundColor: "#fffffff5", minHeight: "100vh" }}>
            <NavBar />
            <div>
                <MatchDetails />
            </div>
            <SearchBar />
            <div style ={{ display: "flex", flexDirection: "row", gap: "20px"}}>
                <MatchField title="Kommande matcher" />
                <MatchField title="Tidigare matcher" />
            </div>
        </div>
    );
}




export default MatcherPage;