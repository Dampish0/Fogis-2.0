import React from "react";
import NavBar from "../../components/Navbar/NavBar";
import { Container, Typography, List, ListItemButton, ListItemText } from "@mui/material";
import "./CompetitionPage.css";

const setMUI = (color) => ({
  "& label.Mui-focused": { color },
  "& .MuiInput-underline:after": { borderBottomColor: color },
  "& .MuiInputLabel-root": { color },
  "& .MuiOutlinedInput-input": { color },
  "& .MuiOutlinedInput-root": {
    borderRadius: "34px",
    "& fieldset": { borderColor: color },
    "&:hover fieldset": { borderColor: color },
    "&.Mui-focused fieldset": { borderColor: color },
  },
});

// Dummy-data
const seriesData = [
  { id: 1, name: "Division 1 Norra", season: "2025", teams: 14 },
  { id: 2, name: "Division 2 Södra", season: "2025", teams: 12 },
  { id: 3, name: "Juniorallsvenskan", season: "2025", teams: 16 },
  { id: 4, name: "Damettan Västra", season: "2025", teams: 12 },
];

const cupsData = [
  { id: "c1", name: "Svenska Cupen", stage: "Kvalomgång", start: "2025-03-10" },
  { id: "c2", name: "Göteborg Cup", stage: "Gruppspel", start: "2025-05-02" },
  { id: "c3", name: "Skåne Invitational", stage: "Slutspel", start: "2025-06-15" },
  { id: "c4", name: "Stockholm Open", stage: "Gruppspel", start: "2025-08-20" },
];

const CompetitionPage = () => {
  const handleSerieClick = (item) => {
    // Här kan du navigera till detaljsida senare, ex: navigate(`/series/${item.id}`)
    console.log("Serie klickad:", item);
  };

  const handleCupClick = (item) => {
    console.log("Cup klickad:", item);
  };

  return (
    <div className="page">
      <NavBar />

      {/* Statisk, centrerad rubrik */}
      <div className="titleBadge">
        <Typography variant="h4" className="titleText">
          Tävlingar
        </Typography>
      </div>

      <Container maxWidth="lg" className="content">
        <div className="twoCol">
          {/* Vänster – Serier */}
          <section className="left">
            <Typography variant="h5" className="sectionTitle">
              Serier
            </Typography>

            <List className="list">
              {seriesData.map((s, idx) => (
                <li key={s.id} className="listRow">
                  <ListItemButton
                    className="listItem"
                    onClick={() => handleSerieClick(s)}
                  >
                    <ListItemText
                      primary={
                        <span className="rowTitle">
                          {s.name} <span className="tag">{s.season}</span>
                        </span>
                      }
                      secondary={
                        <span className="rowMeta">
                          {s.teams} lag • dubbelmöten
                        </span>
                      }
                    />
                  </ListItemButton>
                  {idx !== seriesData.length - 1 && <div className="rowDivider" />}
                </li>
              ))}
            </List>
          </section>

          {/* Mittspalt – luft */}
          <div className="mid" aria-hidden="true" />

          {/* Höger – Cuper */}
          <section className="right">
            <Typography variant="h5" className="sectionTitle">
              Cuper
            </Typography>

            <List className="list">
              {cupsData.map((c, idx) => (
                <li key={c.id} className="listRow">
                  <ListItemButton
                    className="listItem"
                    onClick={() => handleCupClick(c)}
                  >
                    <ListItemText
                      primary={
                        <span className="rowTitle">
                          {c.name} <span className="tag tag--alt">{c.stage}</span>
                        </span>
                      }
                      secondary={
                        <span className="rowMeta">
                          Start {c.start}
                        </span>
                      }
                    />
                  </ListItemButton>
                  {idx !== cupsData.length - 1 && <div className="rowDivider" />}
                </li>
              ))}
            </List>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default CompetitionPage;
