import React from 'react'
import { Typography, Link, Box } from '@mui/material'

const PageFooter = () => {
  return (
    <div style={{
    position: 'absolute',
    left: 0,
    bottom: "1.5vh",
    width: '100%',
    zIndex: 10, 
  }} >
    <Box
        component="footer"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box style={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: 16,
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          fontSize: '1rem',
          textAlign: 'center',
          

          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}>
        {/* about us link, support and copyright thing. */}
        <Typography variant="body2" style={{ color: "#fff", margin: 0 }}>© 2023 Fogis. All rights reserved.</Typography>
        <Typography variant="body2" style={{ marginLeft: "60px", color: "#fff" }}>
          <Link href="/about" color="inherit" style={{color: "#fff", textDecoration:"underline"}}>About Us</Link>   |   <Link href="/support" color="inherit" style={{color: "#fff", textDecoration:"underline"}}>Support</Link>
        </Typography> 
        </Box>
    </Box>
    </div>
  )
}

export default PageFooter