import React from 'react'
import NavBar from '../../../components/Navbar/NavBar'
import { Autocomplete, Box, Button, Tab, Tabs, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useState } from 'react';
import useAuthStore from '../../../store/authStore';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

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

const userEditPage = (props) => {
    const { sendNotification, error: Aerr, loading: Aloading, register: createUser } = useAuthStore();
    const [tabIndex, setTabIndex] = useState(0);
    const [selectedNotificationGroup, setSelectedNotificationGroup] = useState('all');
    const [notififyAttempted, setNotifyAttempted] = useState(false);
    const { user, error } = useAuthStore();
    const role = props.role

    const [selectedRole, setSelectedRole] = useState("trainer");

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const tabChange = (e , n) => {
        setTabIndex(n);
    }

    const emailRef = React.useRef();
    const userNameRef = React.useRef();
    const authRoleRef = React.useRef();

    const titleRef = React.useRef();
    const messageRef = React.useRef();
    const userIdRef = React.useRef();
    const clubIdRef = React.useRef();
    const handleNotify = async (e) => {
        e.preventDefault();

        const title = titleRef.current.value;
        const message = messageRef.current.value;
        const group = selectedNotificationGroup;
        if(selectedNotificationGroup === "individual" && userIdRef.current.value.trim() === ""){
            toast.error("Användar ID krävs för individuell notifikation");
            return;
        }
        if(selectedNotificationGroup === "club" && clubIdRef.current.value.trim() === ""){
            toast.error("Klubb ID krävs för klubb notifikation");
            return;
        }
        if(selectedNotificationGroup == undefined){
            toast.error("ERROR STATUS: 500");
            return;
        }
        const userId = userIdRef?.current?.value || null;
        const clubId = clubIdRef?.current?.value || null;

        try {
// { title, message, group, clubId, userId }
            setNotifyAttempted(true);
            await sendNotification(title, message, group, userId, clubId);
            titleRef.current.value = "";
            messageRef.current.value = "";
            userIdRef.current.value = "";
            clubIdRef.current.value = "";
        } catch (error) {
            setNotifyAttempted(false);
            return;
        }
    }

    useEffect(() => {
        if(notififyAttempted){ 
                if (Aerr) {
                    toast.error("Misslyckades att skicka notifikation: " + Aerr);
                    setNotifyAttempted(false);
                    return;
                }
                if (!Aloading && notififyAttempted) {
                    toast.success("Notifikation skickad");
                    setNotifyAttempted(false);
                    return;
                }
           }
    }, [Aerr, Aloading]);

    const handleCreateUser = async () => {
        try{
            await createUser(userNameRef.current.value, emailRef.current.value, authRoleRef.current?.value || "trainer");
            toast.success("Lyckades.");
        } catch (error) {
            toast.error("Ett fel inträffade: " + error.message);
        }
    }

  return (
    <div style={{overflow: "hidden", minHeight: "100vh"}}>
        <NavBar/>
        
        <Tabs value={tabIndex} indicatorColor="primary" textColor="primary" centered onChange={tabChange}
        sx={{ marginTop: "20px", }}>
            <Tab label="Skapa användare" style={{color: "black"}} />
            <Tab label="Redigera användare" style={{color: "black"}} />
            <Tab label="Hitta användare" style={{color: "black"}} />
            <Tab label="Skicka Notification" style={{color: "black"}} />
        </Tabs> 
        
        <div style={{boxShadow: "0 4px 16px rgba(0, 0, 0, 0.7)", backgroundColor: "rgba(0,0,0, 0.7)"
        , backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: "14px", padding: "20px"
        , width: "25vw", height: "65vh", justifyContent: "center", alignItems: "center", display: "flex", margin: "40px auto", flexDirection: "column",
            color: "white"
        }}>

            <div style={{position: "absolute", top: "30px"}}>

                {tabIndex === 0 && <Typography variant='h3'>Skapa användare</Typography>}
                {tabIndex === 1 && <Typography variant='h3'>Redigera användare</Typography>}
                {tabIndex === 2 && <Typography variant='h3'>Ta bort användare</Typography>}
                {tabIndex === 3 && <Typography variant='h3'>Skicka Notification</Typography>}


            </div>
            
{/* part for inputs */}
           <Box sx={{ ...textFieldColor("white"), width: "20vw", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column"  }}>
                {tabIndex === 0 && (
                    <>
                        <TextField inputRef={userNameRef} label="Användarnamn" variant="outlined" margin="normal" fullWidth />
                        <TextField inputRef={emailRef} label="E-post" variant="outlined" margin="normal" fullWidth />
                        <Autocomplete onInputChange={(e, v) => setSelectedRole(v)} style={{width: "100%"}}
                            options={["admin", "tränare", "domare", role == "dev" || role == "superadmin" ? "superadmin" : null].filter(Boolean)}
                            renderInput={(params) => <TextField {...params} label="Roll" variant="outlined" margin="normal" fullWidth />}
                        />
                        <Button onClick={handleCreateUser} size='large' variant='contained' color='primary' style={{fontSize:"20px", marginTop: "20px", position:"absolute", bottom:"3vh" }}>
                            Skapa
                        </Button>
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
                {tabIndex === 3 && (
                    <>
                        <div style={{marginTop:"5vh"}}></div>
                        <ToggleButtonGroup style={{position:"absolute", top:"10vh"}}  color="primary" value={selectedNotificationGroup} exclusive onChange={(event, n) => setSelectedNotificationGroup(n)}>
                            <ToggleButton value="all" sx={{ color: "white", borderColor: "white", '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white', borderColor: 'white' }, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                                Alla
                            </ToggleButton>
                            <ToggleButton value="club" sx={{ color: "white", borderColor: "white", '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white', borderColor: 'white' }, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                                klubb
                            </ToggleButton>
                            <ToggleButton value="admin" sx={{ color: "white", borderColor: "white", '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white', borderColor: 'white' }, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                                Admin
                            </ToggleButton>
                            <ToggleButton value="individual" sx={{ color: "white", borderColor: "white", '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white', borderColor: 'white' }, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                                användare
                            </ToggleButton>

                        </ToggleButtonGroup>

                        {selectedNotificationGroup === "individual" && (
                            <TextField inputRef={userIdRef} label="Användarnamn" variant="outlined" margin="normal" fullWidth />
                        )}
                        {selectedNotificationGroup === "club" && (
                            <TextField inputRef={clubIdRef} label="Klubb ID" variant="outlined" margin="normal" fullWidth />
                        )}

                        <TextField inputRef={titleRef} label="Titel" variant="outlined" margin="normal" fullWidth />
                        <TextField inputRef={messageRef} label="Meddelande" variant="outlined" margin="normal" fullWidth multiline rows={4} />

                        <Button onClick={handleNotify} size='large' variant='contained' color='primary' style={{fontSize:"20px", marginTop: "20px", position:"absolute", bottom:"3vh" }}>
                            Skicka
                        </Button>

                    </>
                )}
            </Box>






        </div>

    </div>
  )
}

export default userEditPage