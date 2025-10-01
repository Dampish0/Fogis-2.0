import { Typography } from '@mui/material'
import React from 'react'

const NewsDetail = (props) => {
  return (
    <div style={{
      width: "90vw",          
      maxHeight: "90vh",     
      overflowY: "auto",      
      overflowX: "hidden",
    
      padding: "24px",
      borderRadius: "14px",
      background: "rgba(30, 30, 30, 0.7)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.7)",
      paddingBottom: "30vh", 
    }}>

     <img
    src={props.newsImage}
    alt={props.title}
    style={{
    display: "block",
    margin: "0 auto",
    borderRadius: "12px",
    width: "auto",       
    height: "auto",
    maxWidth: "100%",
    maxHeight: "60vh",   
    objectFit: "contain"
  }}
/>


        <Typography color='white' style={{ textAlign: "center", marginTop: "16px"}} variant="h3">{props.title}</Typography>
        <Typography color='white' style={{ textAlign: "center"}} variant="body1">          <span style={{ whiteSpace: "pre-wrap" }}>{props.newsText}</span>
</Typography>
    </div>
  )
}

export default NewsDetail