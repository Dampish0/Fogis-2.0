import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import './MatchDetail.css';
import HFF from '../../assets/hff.png';
import TORD from '../../assets/Tord.png';


function MatchDetails({}) {

    const [activeTab, setActiveTab] = React.useState('lineups');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'lineups':
                return <div className="lineups-content">Lineups</div>;
            case 'matchFacts':
                return <div className="match-content">Match händelser</div>;
            case 'table':
                return <div className="tabell-content">Tabell</div>;
            default:
                return null;
        }
    };

    return (
        <div className="matchdetails">

            <div className="scoreboard" >
                <h3>Match Information</h3>

                <div className="score">
                    <img src={HFF} alt="HFF" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
                    <p>0 - 0</p>
                    <img src={TORD} alt="TORD" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
                </div>
                <div className="teams">
                    <p>Husqvarna FF</p>  <p>IK Tord</p>
                </div>
            </div>
                <div className="tabs">
                    <Button onClick={() => setActiveTab('lineups')} variant={activeTab === 'lineups' }>Lineups</Button>
                    <Button onClick={() => setActiveTab('matchFacts')} variant={activeTab === 'matchFacts' }>Matchfakta</Button>
                    <Button onClick={() => setActiveTab('table')} variant={activeTab === 'table' }>Tabell</Button>
                </div>
                <div className="tab-content">{renderTabContent()}</div>
        </div>
    );
}

export default MatchDetails;