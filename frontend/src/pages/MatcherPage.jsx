import Container from '@mui/material/Container'
import React from 'react'
import MatchDetail from '../components/MatchDetail'
import NavBar from '../components/Navbar'
import ListMUI from '../components/ListMUI'
import { Box, Divider } from '@mui/material'

function MatcherPage() {
    return(
        <div style={{
            background: "#ebebebff", padding: "10%",
        }}>
            
        <MatchDetail></MatchDetail>

        </div>
    );
}


export default MatcherPage