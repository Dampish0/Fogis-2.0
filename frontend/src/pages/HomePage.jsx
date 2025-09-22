import React from 'react'
import NavBar from '../components/NavBar.jsx';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import '@fontsource/roboto/500.css';

const HomePage = () => {
  return (
    <div className='min-h-screen' style={{ fontFamily: 'Roboto, sans-serif' }}>
      <NavBar/>
      <Button onClick={() => toast.success("Congrats unc", {
        style: { fontFamily: 'Roboto, sans-serif' }
      })}>
        do not click me
      </Button>
    </div>
  )
}

export default HomePage;