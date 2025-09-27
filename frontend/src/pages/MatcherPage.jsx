import Container from '@mui/material/Container'
import React from 'react'
import NavBar from '../components/Navbar/NavBar.jsx'
import ListMUI from '../components/ListMUI.jsx'
import { Divider } from '@mui/material'
import MatchCard from "../components/MatchDetails/MatchCard";
import MatchDetails from "../components/MatchDetails/MatchDetails";



function MatcherPage() {
    return (
        <div>
            <NavBar />
            <div className="page">
                
                <MatchCard title="Kommande matcher"/>
                <MatchDetails />
            </div>

        </div>
    );
}




export default MatcherPage;