import { Button, Divider, Typography } from '@mui/material'

function MatchField({ title }) {
    return (
        <div className="match-container">
            <div style={{marginRight: "20px", marginLeft: "20px"}}>
                <Typography style={{fontSize: "150%", margin: "0"}}>{title}</Typography>
                <Divider style={{marginBottom: "20px", marginTop: "20px"}} />
                
                <Divider style={{marginBottom: "20px", marginTop: "20px"}} />
                
            </div>
            <Button style={{ color: "black", backgroundColor: "rgba(255, 255, 255, 1)"}}>Visa fler</Button>
        </div>
    );
}

export default MatchField;