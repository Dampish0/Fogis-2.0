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
    <div style={{ minHeight: "100vh" }}>
      <NavBar />

      <div
        style={{
          background: "rgba(30, 30, 30, 0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          zIndex: 6,
          position: "absolute",
          left: "50%",
          top: "clamp(100px, 8vh, 200px)",
          transform: "translate(-50%, -10%)",
          marginLeft: "40px",
          borderRadius: "20px",
          padding: "8px 24px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.7)",
        }}
      >
        <Typography variant="h4" style={{ color: "#fff" }}>
          Tävlingar
        </Typography>
      </div>

    </div>
  )
}

export default CompetitionPage;