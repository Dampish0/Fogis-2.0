import { Button, TextField, Typography } from '@mui/material'
import React, { useRef } from 'react'

const NewPasswordPage = () => {
    const pass1 = useRef();
    const pass2 = useRef();

  const textFieldColor = (color) => (
    {
                    '& label.Mui-focused': {
                    color: color,
                    },
                    '& .MuiInput-underline:after': {
                    borderBottomColor: color,
                    },
                    '& .MuiInputLabel-root': {
                    color: color,
                    },
                    '& .MuiOutlinedInput-input': {
                    color: color,
                    },
                    '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: color,
                    },
                    '&:hover fieldset': {
                        borderColor: color,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: color,
                    },
                    },
             }
  );

  const validatePassword = (pass) => {
    if (pass.length < 10) {
        return false;
    }
    if(!/[A-Z]/.test(pass)) {
        return false;
    }
    if(!/[a-z]/.test(pass)) {
        return false;
    }
    if(!/[0-9]/.test(pass)) {
        return false;
    }
    if(!/[^*":{}<>]/.test(pass)) {
        return false;
    }
    return true;
  }

  const submitPass = (pass, confirmPass) => {
      if (pass === confirmPass) {
          // Call API to change password
      } else {
          // Show error message
      }
    }

  return (
    <div style={{maxWidth:400, display:"flex", flexDirection:"column", gap:20, padding:20, boxShadow:"0 0 10px rgba(0,0,0,0.1)", borderRadius:10,   

        backdropFilter: 'blur(14px) saturate(20%)',
        WebkitBackdropFilter: 'blur(14px) saturate(20%)',
        backgroundColor: 'rgba(0,0,0,0.7)', 
        transform: 'translate(-50%, -80%)',
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: 'clamp(300px, 30%, 600px)',
    }}>
        <Typography variant='h5' align='center' style={{marginBottom:20, color:"#ffffff"}}>
            Välj nytt lösenord
        </Typography>
        <TextField 
            inputRef={pass1}
            sx={textFieldColor("#ffffff")}
          label="Nytt Lösenord"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
        />
        <TextField 
            inputRef={pass2}
            sx={textFieldColor("#ffffff")}
            label="Bekräfta Lösenord"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            />
        <Button variant="contained" color="primary" fullWidth
            onClick={() => submitPass(pass1.current.value, pass2.current.value)}
        >
            Ändra Lösenord
        </Button>
    </div>
  )
}

export default NewPasswordPage
