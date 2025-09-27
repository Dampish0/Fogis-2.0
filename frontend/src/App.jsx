import React from 'react';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/detailpage';
import toast from "react-hot-toast";
import Button from '@mui/material/Button';
import '@fontsource/roboto/500.css';
import MatcherPage from './pages/MatcherPage';
import LoginPage from './pages/LoginPage';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto',
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/create' element={<CreatePage/>}/>
        <Route path='/note/:id' element={<DetailPage/>}/>
        <Route path='/matcher' element={<MatcherPage/>}/>


      </Routes>
    </div>
    </ThemeProvider>
  )
}

export default App;