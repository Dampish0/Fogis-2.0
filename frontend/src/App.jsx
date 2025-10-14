import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import toast from "react-hot-toast";
import Button from '@mui/material/Button';
import '@fontsource/roboto/500.css';
import Backdrop from '@mui/material/Backdrop';


import { Toaster } from 'react-hot-toast';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import useAuthStore from './store/authStore';
import {standardRoutes, adminRoutes, ProtectedRoute, RedirectAuthenticated, refereeRoutes, trainerRoutes

 } from './routes';


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
  const role = "trainer" // user?.role || "guest";
  useEffect(() => {
    checkAuth();
  }, [checkAuth])
  
  if(isCheckingAuth){
    return <Backdrop sx={{zIndex:4}} open={isCheckingAuth}><CircularProgress style={{ color: 'red', position: 'absolute', top: '50%', left: '50%'}}/></Backdrop>
  }



  return (
    <ThemeProvider theme={theme}>
        <div>
          <Routes>
            {standardRoutes()}

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
      </div>
    </ThemeProvider>
  )
}

export default App;