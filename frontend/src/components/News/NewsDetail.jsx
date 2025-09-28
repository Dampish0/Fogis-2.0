import { Typography } from '@mui/material'
import React from 'react'

const NewsDetail = (props) => {
  return (
    <div style={{
        padding: "20px",
        maxWidth: "clamp(300px, 50vw, 1200px)",
        paddingBottom: "30vh",
        borderRadius: "14px",
        background: "rgba(30, 30, 30, 0.7)",
      backdropFilter: "blur(12px)", 
      WebkitBackdropFilter: "blur(12px)",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.7)",
        maxHeight: "calc(80vh)",
        overflowY: "auto",
        overflowX: "hidden",
    }}>
        <img style={{margin: "0 auto", borderRadius: "14px", maxHeight: "40vh", maxWidth: "40vw"}} src={props.newsImage}/>


        <Typography color='white' style={{ textAlign: "center", marginTop: "16px"}} variant="h3">{props.title}</Typography>
        <Typography color='white' style={{ textAlign: "center"}} variant="body1">          <span style={{ whiteSpace: "pre-wrap" }}>{props.newsText}</span>
</Typography>
    </div>
  )
}

export default NewsDetail