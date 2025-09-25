import Button from '@mui/material/Button';
import './MatchDetail.css';

function MatchCard({ title }) {
    return (
        <div className="match-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", padding: "10px" }}>
            <h3>{title}</h3>
            <Button variant="text">Visa fler</Button>
        </div>
    );
}

export default MatchCard;