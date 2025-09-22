import React from 'react'
import NavBar from '../components/navbar';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';

const HomePage = () => {
  return (
    <div className='min-h-screen'>
      <NavBar/>
      <Button onClick={() => toast.success("Congrats unc")}>do not click me</Button>


    </div>
  )
}

export default HomePage;