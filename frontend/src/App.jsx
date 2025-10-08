import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import HomePage from './pages/HomePage/HomePage';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/detailpage';
import toast from "react-hot-toast";
import Button from '@mui/material/Button';
import '@fontsource/roboto/500.css';
import MatcherPage from './pages/MatcherPage';
import LoginPage from './pages/LoginPage';
import Backdrop from '@mui/material/Backdrop';
import NewPasswordPage from './pages/newPasswordPage';
import NewsPage from './pages/NewsPage/NewsPage';
import CompetitionPage from './pages/CompetitionPage';
import TestingPage from './pages/testingPage';

import { Toaster } from 'react-hot-toast';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import useAuthStore from './store/authStore';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto',
  },
});

const ProtectedRoute = ({children}) => {
  // temporay dev test code
  return children;
  // --------------------
  const {isAuthenticated, isCheckingAuth} = useAuthStore();

  if(isCheckingAuth){
    return <CircularProgress/>
  }

  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }

  return children;
}

const RedirectAuthenticated = ({children}) => {
  // temporay dev test code
  return children;
  // --------------------
  const {isAuthenticated} = useAuthStore();
  if(isAuthenticated){
    return <Navigate to="/" replace/>
  }

  return children;
}


export const App = () => {
  const {checkAuth, isCheckingAuth, isAuthenticated, user} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])
  
  if(isCheckingAuth){
    return <Backdrop sx={{zIndex:4}} open={isCheckingAuth} onClick={() => setForgotPass(false)}><CircularProgress style={{ color: 'red', position: 'absolute', top: '50%', left: '50%'}}/></Backdrop>

  }

  return (
    <ThemeProvider theme={theme}>
        <div>
         <Routes>
          <Route path='/login' element={<RedirectAuthenticated><LoginPage/></RedirectAuthenticated>}/>
          <Route path='/' element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
          <Route path='/create' element={<ProtectedRoute><CreatePage/></ProtectedRoute>}/>
          <Route path='/matcher' element={<ProtectedRoute><MatcherPage/></ProtectedRoute>}/>
          <Route path='/reset-password/:token' element={<ProtectedRoute><NewPasswordPage/></ProtectedRoute>}/>
          <Route path='/nyheter' element={<ProtectedRoute><NewsPage/></ProtectedRoute>}/>
          <Route path='/tavlingar' element={<ProtectedRoute><CompetitionPage/></ProtectedRoute>}/>

          <Route path='/test' element={<ProtectedRoute><TestingPage/></ProtectedRoute>}/>


          <Route path='*' element={<Navigate to={isAuthenticated ? "/" : "/login"} replace/>}/>
          </Routes>
        <Toaster/>
      </div>
    </ThemeProvider>
  )
}

export default App;