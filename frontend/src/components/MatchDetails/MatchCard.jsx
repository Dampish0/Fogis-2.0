import Button from '@mui/material/Button';
import './MatchDetail.css';



function MatchCard({ title }) {
    return (
        <div className="match-card">
            <h3>{title}</h3>
            <Button style={{ backgroundColor: "rgb(0, 0, 0)", color: "white" }}>Visa fler</Button>
        </div>
    );
}

export default MatchCard;