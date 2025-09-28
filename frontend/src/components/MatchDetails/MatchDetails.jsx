import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import './MatchDetail.css';
import HFF from '../../assets/hff.png';
import TORD from '../../assets/Tord.png';


function MatchDetails({}) {

    const [activeTab, setActiveTab] = React.useState('matchFacts');

    const events = [
    { minute: 4,  type: "goal",   player: "Lionel Messi", team: "away" },
    { minute: 7,  type: "goal",   player: "Lionel Messi", team: "away" },
    { minute: 9,  type: "yellow", player: "Varane",       team: "home" },
    { minute: 24, type: "goal",   player: "Suarez",       team: "away" },
    { minute: 25, type: "yellow", player: "Lionel Messi", team: "away" },
    { minute: 45, type: "red",    player: "Sergio Ramos", team: "home" },
    { minute: 52, type: "assist", player: "Neymar",       team: "away" },
    { minute: 77, type: "goal",   player: "Rakitic",      team: "away" },
    { minute: 83, type: "goal",   player: "Lionel Messi", team: "away" },
    { minute: 2,  type: "red",    player: "Cristiano Ronaldo", team: "home" },
    { minute: 68, type: "sub",    player: "In: J. Doe / Ut: A. Doe", team: "home" },
  ];


    const renderTabContent = () => {
        switch (activeTab) {
            case 'lineups':
                return <div className="lineups-content">Lineups</div>;
            case 'matchFacts':
                return <MatchFacts events={events} />;
            case 'table':
                return <div className="tabell-content">Tabell 2</div>;
            default:
                return null;
        }
    };

    return (
        <div className="matchdetails">

            <div className="scoreboard" >
                <h3 style = {{color: "white"}}>Match Information</h3>

                <div className="score">
                    <img src={HFF} alt="HFF" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
                    <p style = {{color: "white"}}>0 - 0</p>
                    <img src={TORD} alt="TORD" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
                </div>
                <div className="teams">
                    <p style = {{color: "white"}}>Husqvarna FF</p>  <p style = {{color: "white"}}>IK Tord</p>
                </div>
            </div>
                <div className="tabs">
                    <Button 
                        onClick={() => setActiveTab('lineups')} 
                        variant={activeTab === 'lineups' ? 'contained' : 'text'}
                        className={activeTab === 'lineups' ? 'tab-button active' : 'tab-button'}
                        >Lineups</Button>
                    <Button 
                        onClick={() => setActiveTab('matchFacts')} 
                        variant={activeTab === 'matchFacts' ? 'contained' : 'text'}
                        className={activeTab ==='matchFacts' ? 'tab-button active' : 'tab-button'}
                         >Matchfakta</Button>
                    <Button
                         onClick={() => setActiveTab('table')} 
                         variant={activeTab === 'table' ? 'contained' : 'text'}
                         className={activeTab === 'table'? 'tab-button active' : 'tab-button'}
                         >Tabell</Button>
                </div>
                <div className="tab-content">{renderTabContent()}</div>
        </div>
    );
}

function MatchFacts({ events }) {
  const [filter, setFilter] = React.useState("all"); // all | goal | yellow | red | assist | sub

  const iconMap = {
    goal: "⚽",
    yellow: "🟨",
    red: "🟥",
    assist: "🎯",
    sub: "🔁",
  };

  const labelMap = {
    all: "Alla",
    goal: "Mål",
    yellow: "Gult",
    red: "Rött",
    assist: "Assist",
    sub: "Byte",
  };

  const filtered = events
    .filter((e) => (filter === "all" ? true : e.type === filter))
    .sort((a, b) => a.minute - b.minute);

  const home = filtered.filter((e) => e.team === "home");
  const away = filtered.filter((e) => e.team === "away");

  return (
    <div className="facts">
      {/* Underflik / filterrad */}
      <div className="subtabs">
        {["all", "goal", "yellow", "red", "assist", "sub"].map((key) => (
          <button
            key={key}
            className={`chip ${filter === key ? "active" : ""}`}
            onClick={() => setFilter(key)}
            aria-pressed={filter === key}
          >
            {key !== "all" ? <span className="chip-ico">{iconMap[key]}</span> : null}
            {labelMap[key]}
          </button>
        ))}
      </div>

      {/* Två kolumner: Hemma | Borta */}
      <div className="events-grid">
        <div className="events-col">
          <div className="events-title">Hemma</div>
          {home.length === 0 && <div className="events-empty">–</div>}
          {home.map((e, i) => (
            <div className="event-item" key={`h-${i}`}>
              <span className={`event-ico type-${e.type}`}>{iconMap[e.type]}</span>
              <span className="event-player">{e.player}</span>
              <span className="event-minute">{e.minute}'</span>
            </div>
          ))}
        </div>

        <div className="divider-vertical" aria-hidden="true" />

        <div className="events-col">
          <div className="events-title">Borta</div>
          {away.length === 0 && <div className="events-empty">–</div>}
          {away.map((e, i) => (
            <div className="event-item" key={`a-${i}`}>
              <span className={`event-ico type-${e.type}`}>{iconMap[e.type]}</span>
              <span className="event-player">{e.player}</span>
              <span className="event-minute">{e.minute}'</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MatchDetails;