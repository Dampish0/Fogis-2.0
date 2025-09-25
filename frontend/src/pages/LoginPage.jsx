import React from 'react'
import img from '../assets/img4.jpg'
import { Box, Button, Divider, Link, TextField, Typography } from '@mui/material';
import { useState } from "react";
import LoginIcon from '@mui/icons-material/Login';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const LoginPage = () => {
  return (
    <div style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',            // make container positioned for absolutely positioned BG
        overflow: 'hidden', 
        
        }}>
      <div
      style={{
        width: '100vw',
        height: '100vh',
        justifyContent: 'right', 
        paddingRight: '10%',
        alignItems: 'center',
        display: 'flex',
      }}
    >
        <Typography style={{letterSpacing:"4px", textAlign:"center"}} variant="h1" component="h1" sx={{ color: 'white', mt: 0 }}>
          FAIS
        </Typography>    


        {/* // om oss delen */}
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                position: 'relative',
                overflow: 'hidden',
            }}
            >
                <div
                style={{
                    zIndex: 1,
                    width: '520px',
                    minHeight: "40%",
                    backdropFilter: 'blur(14px) saturate(140%)',
                    WebkitBackdropFilter: 'blur(14px) saturate(140%)',
                    backgroundColor: 'rgba(0,0,0,0.25)',
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    justifyContent: 'center',
                    borderRadius: '36px',
                }}
                >
                <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
                    Om oss
                </Typography>
                <Typography sx={{ color: 'white', fontSize: '1.15rem' }}>
                    Fotbollens administrativa informationssystem (FAIS) är en plattform för att lätt kunna hantera sina spelare i ett förbund, anmäla till tävlinfar, hantera domare och mer.
                    <br/><br/>
                    Utvecklad i webbutvecklingskursen.
                </Typography>
                <div style={{position:'absolute', bottom:"32px", left:"0", width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '20px'}}>
                    <ArrowBackIcon style={{color: 'white'}}/>
                    <div style={{width: '10px', height: '10px', marginTop: '7.5px', backgroundColor: 'white', borderRadius: '50%'}}></div>
                    <div style={{width: '10px', height: '10px', marginTop: '7.5px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '50%'}}></div>
                    <div style={{width: '10px', height: '10px', marginTop: '7.5px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '50%'}}></div>
                    <ArrowForwardIcon style={{color: 'white'}}/>

                </div>
            </div>
        </div>

    // login delen
        <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(6px)',
          transform: 'scale(1.05)',
          zIndex: 0,
        }}
      />
      
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
        pointerEvents: 'none',
          mixBlendMode: 'overlay',
          zIndex: 1,
        }} />

      <Box 
      
        component="form"
        sx={{ '& .MuiTextField-root': { m: 2, width: '35ch' } }}
        autoComplete="off"
      style={{
        width: '23.3vw',
        minHeight: "40%",
        backdropFilter: 'blur(14px) saturate(140%)',
        WebkitBackdropFilter: 'blur(14px) saturate(140%)',
        backgroundColor: 'rgba(0,0,0,0.25)', 
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '36px',
      }}
        >
        <Typography variant="h3" component="h1" sx={{ color: 'white', mt: 0 }} style={{textAlign:"center"}}>
          Välkommen till FAIS
        </Typography>
                    <Divider sx={{ bgcolor: "rgba(255,255,255,0.25)", height: 2, width: "70%" }} />

        <TextField id="emailbox" type="email" label="Email" variant="outlined"
            sx={{
                    '& label.Mui-focused': {
                    color: 'white',
                    },
                    '& .MuiInput-underline:after': {
                    borderBottomColor: 'white',
                    },
                    '& .MuiInputLabel-root': {
                    color: 'white',
                    },
                    '& .MuiOutlinedInput-input': {
                    color: 'white',
                    },
                    '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'white',
                    },
                    '&:hover fieldset': {
                        borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'white',
                    },
                    },
             }}
        />
        <TextField id="passwordbox" type='password' label="Lösenord" variant="outlined"
            wi
            sx={{
                    '& label.Mui-focused': {
                    color: 'white',
                    },
                    '& .MuiInput-underline:after': {
                    borderBottomColor: 'white',
                    },
                    '& .MuiInputLabel-root': {
                    color: 'white',
                    },
                    '& .MuiOutlinedInput-input': {
                    color: 'white',
                    },
                    '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'white',
                    },
                    '&:hover fieldset': {
                        borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'white',
                    },
                    },
             }}
        />
            <Divider sx={{ bgcolor: "rgba(255,255,255,0.25)", height: 2, width: "70%" }} />
        <Button variant="contained" color="primary" endIcon={<LoginIcon />} sx={{fontSize: '1.2rem', width: '70%'}}>Logga in</Button>
        <Link href="/forgotpass" style={{color: 'white', textDecoration: 'underline'}}>Glömt lösenord?</Link>
      </Box>
      <Box
        component="footer"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 20,
          zIndex: 2,
          pointerEvents: 'auto',
        }}
      >
        <Box style={{
          backgroundColor: 'rgba(0,0,0,0.35)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: 16,
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          fontSize: '1rem'
        }}>
          Copyright 2025 FAIS — fais-support@gmail.com
        </Box>
      </Box>
    </div>
    </div>
  )
}

export default LoginPage;