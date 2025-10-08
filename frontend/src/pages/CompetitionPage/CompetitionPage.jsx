import React from "react";
import NavBar from "../../components/Navbar/NavBar";
import { Container, Typography, List, ListItemButton, ListItemText } from "@mui/material";
import "./CompetitionPage.css";

// Elias
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

const seriesData = [
  { id: 1, name: "Division 1 Norra" },
  { id: 2, name: "Division 2 Södra" },
  { id: 3, name: "Division 3 Västra" },
  { id: 4, name: "Division 4 Östra" },
];

const cupsData = [
  { id: "c1", name: "Svenska Cupen" },
  { id: "c2", name: "Göteborg Cup" },
  { id: "c3", name: "Eko Cup" },
  { id: "c4", name: "Hyundai Cup" },
];

const CompetitionPage = () => {
  const handleSerieClick = (item) => {
    console.log("Serie klickad:", item);
  };

  const handleCupClick = (item) => {
    console.log("Cup klickad:", item);
  };

  return (
    <div className="page">
      <NavBar />

      <div className="titleBadge">
        <Typography variant="h4" className="titleText">
          Tävlingar
        </Typography>
      </div>

      <Container maxWidth="lg" className="content">
        <div className="twoCol">
          <section className="left">
            <Typography variant="h5" className="sectionTitle">
              Serier
            </Typography>

            <List className="list" aria-label="Lista över serier">
              {seriesData.map((s, idx) => (
                <li key={s.id} className="listRow">
                  <ListItemButton
                    className="listItem"
                    onClick={() => handleSerieClick(s)}
                    disableRipple
                    disableTouchRipple
                    disableFocusRipple
                  >
                    <ListItemText
                      primary={<span className="rowTitle">{s.name}</span>}
                      secondary={null}
                    />
                  </ListItemButton>
                  {idx !== seriesData.length - 1 && <div className="rowDivider" />}
                </li>
              ))}
            </List>
          </section>

          <div className="mid" aria-hidden="true" />

          <section className="right">
            <Typography variant="h5" className="sectionTitle">
              Cuper
            </Typography>

            <List className="list" aria-label="Lista över cuper">
              {cupsData.map((c, idx) => (
                <li key={c.id} className="listRow">
                  <ListItemButton
                    className="listItem"
                    onClick={() => handleCupClick(c)}
                    disableRipple
                    disableTouchRipple
                    disableFocusRipple
                  >
                    <ListItemText
                      primary={<span className="rowTitle">{c.name}</span>}
                      secondary={null}
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
