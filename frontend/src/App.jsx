import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router'; 
import '@fontsource/roboto/500.css';
import Backdrop from '@mui/material/Backdrop'; 


import { Toaster } from 'react-hot-toast';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import useAuthStore from './store/authStore';
import {standardRoutes, adminRoutes, ProtectedRoute, RedirectAuthenticated, refereeRoutes, trainerRoutes

 } from './routes';
import { useState } from 'react';


const theme = createTheme({
    components: {
    // ...existing code...
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: 'white',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
        },
        input: { color: 'white' },
        notchedOutline: { borderColor: 'white' },
      },
    },
    // Add this for MUI X pickers
    MuiPickersTextField: {
      styleOverrides: {
        root: {
          color: 'white',
          '& .MuiInputLabel-root': { color: 'white' },
          '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
          '& .MuiSvgIcon-root': { color: 'white' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
        },
      },
    }, 
  },
  typography: {
    fontFamily: 'Roboto', 
  },
});


export const App = () => {
  const {checkAuth, isCheckingAuth, isAuthenticated, user} = useAuthStore();
  const role = user?.role || "guest"; // user?.role || "guest";

  const [_, forceUpdate] = useState(0);

  // timeout to check auth after a period to get latest notiser and check if user still logged in
  useEffect(() => {
    const intervalId = setInterval(() => {
      checkAuth();
      console.log("Checking auth...");
    }, 60 * 1000); // 1 minut

    return () => {
      clearInterval(intervalId);
    };
  }, [checkAuth]);


  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  // useEffect(() => {
  //   if(user){
  //     forceUpdate(n => n+1);
  //   }
  // }, [user]);
   

  const [showBackdrop, setShowBackdrop] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (isCheckingAuth) {
      timeoutId = setTimeout(() => setShowBackdrop(true), 300);
    } else {
      setShowBackdrop(false);
    }
    return () => clearTimeout(timeoutId);
  }, [isCheckingAuth]);


  return (
    <ThemeProvider theme={theme}>
        <div>

          <Routes>
            {standardRoutes(user)}

            {user && (
              ((role === "admin" || role === "superadmin" || role === "dev") && adminRoutes(role)) 
              ||
              (role === "trainer" && trainerRoutes(role))
              ||
              (role === "referee" && refereeRoutes(role)))
            }


            {!isCheckingAuth && !user && <Route path='*' element={<Navigate to={isAuthenticated ? "/" : "/login"} replace/>}/> }
           </Routes>

        <Toaster/>
          <Backdrop sx={{zIndex:4}} open={showBackdrop}>
          <CircularProgress style={{ color: 'red', position: 'absolute', top: '50%', left: '50%'}}/>
        </Backdrop>
      </div>
    </ThemeProvider>
  )
}

export default App;