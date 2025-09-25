import Button from '@mui/material/Button';
import './MatchDetail.css';

function MatchDetails({}) {
    return (
        <div className="matchdetails">

            
            <div className="scoreboard" >
                <h3 style={{ textAlign: "center" }}>Match Information</h3>
                <div className="score" style={{ display: "flex", gap: "10%", justifyContent: "center", fontSize: "24px", letterSpacing: "0.1em", fontFamily: "Roboto", alignItems: "center" }}>
                    <p>0 - 0</p>
                </div>
                <div className="teams" style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", padding: "5px 10%" }}>
                    <p>Husqvarna FF</p>  <p>IK Tord</p>
                </div>

            </div>
                <div className="tabs" style={{ display: "flex", justifyContent: "space-around", padding: "5px" }}>
                    <Button variant='text'>Lineups</Button>
                    <Button variant='text'>Matchfakta</Button>
                    <Button variant='text'>Tabell</Button>
                </div>
        </div>
        
    );
}

export default MatchDetails;