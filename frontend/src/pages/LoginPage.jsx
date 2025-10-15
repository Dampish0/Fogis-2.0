import React from 'react'
import img from '../assets/frontpagebg.jpg'
import { Backdrop, Box, Button, CircularProgress, Divider, Icon, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { useState } from "react";
import LoginIcon from '@mui/icons-material/Login';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuthStore } from '../store/authStore.js';
import { NavLink, useNavigate } from 'react-router';
import SendIcon from '@mui/icons-material/Send';
import toast from 'react-hot-toast';
import NavBar from '../components/navbar/Navbar.jsx';


export const LoginPage = () => {
  const navigate = useNavigate();
  const [invalidLogin, setInvalidLogin] = useState(false);

  const [forgotPass, setForgotPass] = useState(false);
  const [InvalidForgotPassEmail, setInvalidForgotPassEmail] = useState(false);
  const [emailForgotPass, setEmailForgotPass] = useState("");
  const [emailErrorForgotPass, setEmailErrorForgotPass] = useState(false);
  const [forgotPassSuccess, setForgotPassSuccess] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [aboutUsIndex, setAboutUsIndex] = useState(0);
  const aboutUsContents = [
                <>
                <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
                    Om oss
                </Typography>
                <Typography sx={{ color: 'white', fontSize: 'clamp(0.8rem, 1vw, 1.15rem)' }}>
                    Fotbollens administrativa informationssystem (FAIS) är en plattform för att lätt kunna hantera sina spelare i ett förbund, anmäla till tävlinfar, hantera domare och mer.
                    <br/><br/>
                    Utvecklad i webbutvecklingskursen.
                </Typography>
                </>,
                <>
                <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
                    BÄST I TEST
                </Typography>
                <Typography sx={{ color: 'white', fontSize: 'clamp(0.8rem, 1vw, 1.15rem)' }}>
                    HEJ HEJ
                </Typography>
                </>,
                <>
                <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
                    VARFÖR FAIS?
                </Typography>
                <Typography sx={{ color: 'white', fontSize: 'clamp(0.8rem, 1vw, 1.15rem)' }}>
                   HEJ DÅ
                </Typography>
                </>,

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

  const {login, loading, error, sendPassResetRequest} = useAuthStore();
  const attemptLogin = async (ema, pass) => {
    if(!ValidateEmail(ema)){
      setEmailError(true);
      if(pass.length === 0){
        setPasswordError(true);
        return;
      }
      return;
    }
    if(pass.length === 0){
      setPasswordError(true);
      return;
    }

    try{

      await login(ema, pass);
      if(error){
        console.log(error);
        return;
      }
      toast.success("Inloggad!", {
        style: { fontFamily: 'Roboto, sans-serif' }
      });
      navigate('/');
    }
    catch(error){
      setInvalidLogin(true);
      toast.error("Ett fel inträffade.", {
        style: { fontFamily: 'Roboto, sans-serif' }
      });
      console.log(error);
    }
  }
  
  const sendPassReset = async (ema) => {
    if(!ValidateEmail(ema)){
      setEmailErrorForgotPass(true);
      return;
    }
    try{
      await sendPassResetRequest(ema);
      toast.success("Återställning av lösenord skickad!", {
        style: { fontFamily: 'Roboto, sans-serif' }
      });
      setForgotPassSuccess(true);
    }catch(error){
      toast.error("Ett fel inträffade.", {
        style: { fontFamily: 'Roboto, sans-serif' }
      });
      setInvalidForgotPassEmail(true);
      console.log(error);
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
      <NavBar style={{ zIndex: 4 }}></NavBar>
        {/* <Typography style={{letterSpacing:"4px", textAlign:"center"}} variant="h1" component="h1" sx={{ color: 'white', mt: 0 }}>
          FAIS
        </Typography>     */}
        <Backdrop sx={{zIndex:4}} open={forgotPass} onClick={(e) => {
          if(e.target === e.currentTarget){ setForgotPass(false);}
        }}>
            <Box 
        
                component="form"
                sx={{ '& .MuiTextField-root': { m: 2, width: '35ch' } }}
                autoComplete="off"
              style={{
                overflow: 'hidden',
                width: 'clamp(400px, 23vw, 520px)',
                minHeight: "30%",
                backdropFilter: 'blur(14px) saturate(20%)',
                WebkitBackdropFilter: 'blur(14px) saturate(20%)',
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
                  Glömt lösenord?
                </Typography>
                            <Divider sx={{ bgcolor: "rgba(255,255,255,0.25)", height: 2, width: "70%" }} />

              <TextField onBlur={() => {
                    setEmailErrorForgotPass(!ValidateEmail(emailForgotPass));
                    
                  }}
                  onChange={(e) => {
                    setEmailForgotPass(e.target.value)
                    if(emailErrorForgotPass){ // if there has eben a error then validate agin
                      if(ValidateEmail(emailForgotPass)){ // to make it less annoying and 
                        setEmailErrorForgotPass(false); // not always have it be red
                      }
                    }
                  }
                }
                onSubmit={(e) =>{
                      if(!emailErrorForgotPass && emailForgotPass.length > 0 && !loading && forgotPass && ValidateEmail(emailForgotPass)){
                        sendPassReset(emailForgotPass);
                      }
                      
                  }}

                  id="emailbox" type="email" label="Email" variant="outlined"
                    sx={emailErrorForgotPass ? textFieldColor("red") : textFieldColor("white") }
                />
                {InvalidForgotPassEmail && <Typography sx={{ color: 'red', fontSize: '1.2rem', mt: -2 }}>Ogiltig e-postadress</Typography>}
                {forgotPassSuccess && <Typography sx={{ color: 'green', fontSize: '1.2rem', mt: -2 }}>Återställningslänk skickad!</Typography>}
                {forgotPassSuccess && <Typography sx={{ color: 'green', fontSize: '1.2rem', mt: -2 }}>Kontrollera din e-postinkorg.</Typography>}

                <Divider sx={{ bgcolor: "rgba(255,255,255,0.25)", height: 2, width: "70%" }} />
                <Button disabled={loading} type='submit' onClick={() => sendPassReset(emailForgotPass)} variant="contained" color="primary"
                endIcon={loading ? <></> : <SendIcon />} sx={{fontSize: '1rem', width: '70%'}}>
                {loading ? <CircularProgress color='secondary'/> : "Skicka Återställningslänk"}</Button>

              </Box>
        </Backdrop>

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
                    width: 'clamp(300px, 30vw, 520px)',
                    minHeight: "clamp(300px, 40vh, 650px)",
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
                  <div style={{paddingBottom: '40px'}}>
                    {aboutUsContents[aboutUsIndex]}
                    </div>
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
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          // filter: 'blur(0px)', // -------------------------------- BLUR ON IMAGE
          // transform: 'scale(1.05)',
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
        sx={{ '& .MuiTextField-root': { m: "clamp(0px, 1vh, 16px)", width: '35ch'} }}
        autoComplete="off"
      style={{
        position: 'absolute',
        right: '10%',
        overflow: 'hidden',
        width: 'clamp(300px, 23vw, 520px)',
        height: "clamp(400px, 60vh, 650px)",
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
        <Typography variant="h2" component="h1" sx={{ fontSize: 'clamp(2rem, 2vw, 3rem)', color: 'white', mt: 0 }} style={{textAlign:"center"}}>
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
              if(!emailError && email.length > 0 && password.length > 0 && !loading && !forgotPass && ValidateEmail(email)){
                attemptLogin(email, password);
              }
          }}
          onChange={(e) => {
              setPassword(e.target.value)
            }
          }
          
          id="passwordbox" type={showPassword ? 'text' : 'password'} label="Lösenord" variant="outlined" 
          onClick={(e) => {
            if(passwordError){
              setPasswordError(false);
            }
          }}
            sx={passwordError ? textFieldColor("red") : textFieldColor("white") }
            slotProps={{
              input: {
                endAdornment: 
                <InputAdornment position="end">
                  <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  style={{ color: 'white' }}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
                </InputAdornment>,
              },
            }}
          />
          {invalidLogin && <Typography sx={{ color: 'red', fontSize: '1.2rem', mt: -2 }}>Felaktiga inloggningsuppgifter</Typography>}
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.25)", height: 2, width: "70%" }} />
        <Button disabled={loading} type='submit' onClick={() => attemptLogin(email, password)} variant="contained" color="primary"
         endIcon={loading ? <></> : <LoginIcon />} sx={{fontSize: '1.2rem', width: '70%'}}>
        {loading ? <CircularProgress color='secondary'/> : "Logga in"}</Button>
        <Button onClick={() => setForgotPass(true)} style={{textDecoration: 'underline' ,color: 'white'}}>Glömt lösenord?</Button>
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