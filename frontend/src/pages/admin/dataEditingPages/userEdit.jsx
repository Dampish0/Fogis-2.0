import React from 'react'
import NavBar from '../../../components/navbar/Navbar'
import { Box, Tab, Tabs, TextField, Typography } from '@mui/material'
import { useState } from 'react';

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

const userEditPage = () => {

    const [tabIndex, setTabIndex] = useState(0);
    const tabChange = (e , n) => {
        setTabIndex(n);
    }

  return (
    <div style={{overflow: "hidden", minHeight: "100vh"}}>
        <NavBar/>
        
        <Tabs value={tabIndex} indicatorColor="primary" textColor="primary" centered onChange={tabChange}
        sx={{ marginTop: "20px", }}>
            <Tab label="Redigera användare" style={{color: "black"}} />
            <Tab label="Redigera lag" style={{color: "black"}} />
            <Tab label="Redigera matcher" style={{color: "black"}} />
        </Tabs> 
        
        <div style={{boxShadow: "0 4px 16px rgba(0, 0, 0, 0.7)", backgroundColor: "rgba(0,0,0, 0.7)"
        , backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: "14px", padding: "20px"
        , width: "40vw", height: "75vh", justifyContent: "center", alignItems: "center", display: "flex", margin: "40px auto", flexDirection: "column",
            color: "white"
        }}>

            <div style={{position: "absolute", top: "30px"}}>

                {tabIndex === 0 && <Typography variant='h3'>Skapa användare</Typography>}
                {tabIndex === 1 && <Typography variant='h3'>Redigera användare</Typography>}
                {tabIndex === 2 && <Typography variant='h3'>Ta bort användare</Typography>}

            </div>
            
{/* part for inputs */}
           <Box sx={{ ...textFieldColor("white")  }}>
                {tabIndex === 0 && (
                    <>
                        <TextField label="Användarnamn" variant="outlined" margin="normal" fullWidth />
                        <TextField label="E-post" variant="outlined" margin="normal" fullWidth />
                    </>
                )}
                {tabIndex === 1 && (
                    <>
                        <TextField label="Användarnamn" variant="outlined" margin="normal" fullWidth />
                        <TextField label="E-post" variant="outlined" margin="normal" fullWidth />
                    </>
                )}
                {tabIndex === 2 && (
                    <>
                        {/* ska fixas senare */}
                    </>
                )}
            </Box>






        </div>

    </div>
  )
}

export default userEditPage