import React from 'react'
import NavBar from '../components/navbar';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import Link from '@mui/material/Link';


const HomePage = () => {
  return (
    <div className='min-h-screen'>
      <NavBar/>
      <Button onClick={() => toast.success("Congrats unc")}>do not click me</Button>

      <div className="news-h-link">
       <Link href="/news" underline="hover" color="primary">
         Nyheter
       </Link>
      </div>

    </div>
  )
}

export default HomePage;