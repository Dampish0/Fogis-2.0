import eif from '../assets/EIF.png'
import { Avatar } from '@mui/material';


function MatchDetail() {
    return(
        
        <div className="matchdetalj">
        <div><Avatar 
        alt="Team logo" 
        src={eif}
        sx={{ width:50, height: 50}} /></div>
            
            <h2>Ekhagens IF</h2>

        </div>
    );
}

export default MatchDetail