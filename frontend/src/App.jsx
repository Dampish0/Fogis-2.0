import React from 'react';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/detailpage';
import toast from "react-hot-toast";
import Button from '@mui/material/Button';

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/create' element={<CreatePage/>}/>
        <Route path='/note/:id' element={<DetailPage/>}/>
        

      </Routes>
    </div>
  )
}

export default App;