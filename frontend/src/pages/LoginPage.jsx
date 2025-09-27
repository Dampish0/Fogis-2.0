import React from 'react'
import img from '../assets/img4.jpg'
import { Box, Button, Divider, Icon, IconButton, Link, TextField, Typography } from '@mui/material';
import { useState } from "react";
import LoginIcon from '@mui/icons-material/Login';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';




export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [aboutUsIndex, setAboutUsIndex] = useState(0);
  const aboutUsContents = [
                <Typography sx={{ color: 'white', fontSize: '1.15rem' }}>
                    Fotbollens administrativa informationssystem (FAIS) är en plattform för att lätt kunna hantera sina spelare i ett förbund, anmäla till tävlinfar, hantera domare och mer.
                    <br/><br/>
                    Utvecklad i webbutvecklingskursen.
                </Typography>,
                <Typography sx={{ color: 'white', fontSize: '1.15rem' }}>
                    HEJ HEJ
                </Typography>,
                <Typography sx={{ color: 'white', fontSize: '1.15rem' }}>
                   HEJ DÅ
                </Typography>,

  ];

  const dotsList = [
      <>
                    <div style={{width: '10px', height: '10px', marginTop: '15px', backgroundColor: 'white', borderRadius: '50%'}}></div>
                    <div style={{width: '10px', height: '10px', marginTop: '15px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '50%'}}></div>
                    <div style={{width: '10px', height: '10px', marginTop: '15px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '50%'}}></div>
      </>,
      <>
                    <div style={{width: '10px', height: '10px', marginTop: '15px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '50%'}}></div>
                    <div style={{width: '10px', height: '10px', marginTop: '15px', backgroundColor: 'white', borderRadius: '50%'}}></div>
                    <div style={{width: '10px', height: '10px', marginTop: '15px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '50%'}}></div>
      </>,
      <>
                    <div style={{width: '10px', height: '10px', marginTop: '15px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '50%'}}></div>
                    <div style={{width: '10px', height: '10px', marginTop: '15px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '50%'}}></div>
                    <div style={{width: '10px', height: '10px', marginTop: '15px', backgroundColor: 'white', borderRadius: '50%'}}></div>
      </>,
  ];

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

  const changeAboutUs = (leftOrRight) => {
    setAboutUsIndex((aboutUsIndex + leftOrRight + 3) % 3);
  }
    
  const ValidateEmail = (email) => {
    const re = /.+@.+\..+/;
    return re.test(email);
  }

  const attemptLogin = async (ema, pass) => {
    try{

    }
    catch(err){

    }
  }
  



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
        {/* <Typography style={{letterSpacing:"4px", textAlign:"center"}} variant="h1" component="h1" sx={{ color: 'white', mt: 0 }}>
          FAIS
        </Typography>     */}


        {/* // om oss delen */}
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                position: 'relative',
                left: "10%",
                overflow: 'hidden',
            }}
            >
                <div
                style={{
                    zIndex: 1,
                    width: '520px',
                    minHeight: "clamp(400px, 40%, 650px)",
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
                    {aboutUsContents[aboutUsIndex]}
                    
                <div style={{position:'absolute', bottom:"32px", left:"0", width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '20px'}}>
                   <IconButton onClick={() => changeAboutUs(-1)} style={{color: 'white'}}><ArrowBackIcon /></IconButton>
                    {dotsList[aboutUsIndex]}
                    <IconButton onClick={() => changeAboutUs(1)} style={{color: 'white'}}><ArrowForwardIcon /></IconButton>

                </div>
            </div>
        </div>

        <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(120deg, rgba(0,0,0,0.25), rgba(0,0,0,0), rgba(0,0,0,0.25)), url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(1px)',
          transform: 'scale(1.05)',
          zIndex: 0,
          
        }}
      />
      
    {/* // login delen */}
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
        position: 'absolute',
        right: '10%',
        overflow: 'hidden',
        width: 'clamp(400px, 23vw, 520px)',
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

      <TextField onBlur={() => {
            setEmailError(!ValidateEmail(email));
            
          }}
          onChange={(e) => {
            setEmail(e.target.value)
            if(emailError){ // if there has eben a error then validate agin
              if(ValidateEmail(email)){ // to make it less annoying and 
                setEmailError(false); // not always have it be red
              }
            }
          }
        }

           id="emailbox" type="email" label="Email" variant="outlined"
            sx={emailError ? textFieldColor("red") : textFieldColor("white") }
        />
        <TextField onSubmit={(e) =>{
            if(!emailError && email.length > 0 && password.length > 0){
              attemptLogin(email, password);
            }
        }}
        onChange={(e) => {
            setPassword(e.target.value)
          }
        }
        
        id="passwordbox" type='password' label="Lösenord" variant="outlined"
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
        >
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setShowPassword(!showPassword)}
            edge="end"
            style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: 'white' }}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </TextField>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.25)", height: 2, width: "70%" }} />
        <Button onClick={() => attemptLogin(email, password)} variant="contained" color="primary" endIcon={<LoginIcon />} sx={{fontSize: '1.2rem', width: '70%'}}>Logga in</Button>
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