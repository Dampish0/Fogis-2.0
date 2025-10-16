import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import toast from "react-hot-toast";
import Button from '@mui/material/Button';
import '@fontsource/roboto/500.css';
import Backdrop from '@mui/material/Backdrop';
import NewPasswordPage from './pages/newPasswordPage';
import NewsPage from './pages/NewsPage/NewsPage';
import CompetitionPage from './pages/CompetitionPage/CompetitionPage';
import CompetitionDetails from './pages/CompetitionPage/CompetitionDetails';
import TestingPage from './pages/testingPage';
import  AdminTrainerPage  from './pages/admin/AdminTrainerPage';
import  AdminRefereePage  from './pages/admin/AdminRefereePage';
import  AdminPage  from './pages/admin/AdminPage';


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

            {
              ((role === "admin" || role === "superadmin" || role === "dev") && adminRoutes(role)) 
              ||
              (role === "trainer" && trainerRoutes(role))
              ||
              (role === "referee" && refereeRoutes(role))
            }


            <Route path='*' element={<Navigate to={isAuthenticated ? "/" : "/login"} replace/>}/>
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