import { Typography } from '@mui/material'
import React from 'react'
import NavBar from '../components/Navbar/NavBar'

const setMUI = (color) => (
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
                      borderRadius: '34px', 
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

const CompetitionPage = () => {
  return (
    <div style={{minHeight: "100vh", backgroundColor: "#ebdfdfff", color: "white", paddingTop: "64px"}}>
        <NavBar/>
        <Typography style={{padding: "20px", color: "black", textAlign: "center"}} variant='h3'  >
            Competition Page
        </Typography>

    </div>
  )
}

export default CompetitionPage;