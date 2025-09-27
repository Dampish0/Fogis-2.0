import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem' // <-- Add this import
import ListItemButton from '@mui/material/ListItemButton'

import ListItemText from '@mui/material/ListItemText'
import React from 'react'



const ListMUI = ({txt = "serie"}) => {

    return (
        <List sx={{ width: '100%'}}>
            {Array.from({ length: 6 }).map((_, i) => (
                <div>
                <ListItemMUI key={i} txt={`${txt} ${i + 1}`} />
                    {/* <Divider style={{backgroundColor:"#e4ebe6", height: "1px", maxWidth: "90%", margin: "0 auto"}}></Divider> */}
                </div>
            ))}       
     </List>
    )
}

const ListItemMUI = ({ txt = "bruh" }) => {

    return (
        <ListItemButton   sx={{  
        my: 0.5,
        mx: 1,
        borderRadius: 1.5,
        justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#334155', // your desired hover color
    },
  }}>
            <ListItemText primary={txt} style={{color:"white", textAlign: "center"}}/>
        </ListItemButton>
    )
    
}

export default ListMUI