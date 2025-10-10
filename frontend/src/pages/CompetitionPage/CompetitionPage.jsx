import React, { useEffect, useState } from "react";
import NavBar from "../../components/Navbar/NavBar";
import { Container, Typography, List, ListItemButton, ListItemText } from "@mui/material";
import CompetitionDetails from "./CompetitionDetails"; 
import "./CompetitionPage.css";

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

  const [selection, setSelection] = useState(null);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const id   = params.get("id");
    const name = params.get("name");
    if (type && id) {
      setSelection({ type, id, name });
    }
  }, []);

  const openSeries = (item) => {
    const sel = { type: "series", id: String(item.id), name: item.name };
    setSelection(sel);
    window.history.pushState(sel, "", `/tavlingdetail?type=series&id=${item.id}&name=${encodeURIComponent(item.name)}`);
  };

  const openCup = (item) => {
    const sel = { type: "cup", id: String(item.id), name: item.name };
    setSelection(sel);
    window.history.pushState(sel, "", `/tavlingdetail?type=cup&id=${item.id}&name=${encodeURIComponent(item.name)}`);
  };


  useEffect(() => {
    const onPop = () => {
      const params = new URLSearchParams(window.location.search);
      const type = params.get("type");
      const id   = params.get("id");
      if (!type || !id) setSelection(null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const handleBack = () => {
    setSelection(null);
    window.history.pushState({}, "", "/tavlingar");
  };

 

if (selection) {
  return (
    <div className="page">
      <NavBar />
      <Container maxWidth="lg" className="content content--details">
        <CompetitionDetails
          type={selection.type}
          id={selection.id}
          name={selection.name}
          onBack={handleBack}
        />
      </Container>
    </div>
  );
}

 
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
            <Typography variant="h5" className="sectionTitle">Serier</Typography>

            <List className="list" aria-label="Lista över serier">
              {seriesData.map((s, idx) => (
                <li key={s.id} className="listRow">
                  <ListItemButton
                    className="listItem"
                    onClick={() => openSeries(s)}
                    disableRipple disableTouchRipple disableFocusRipple
                  >
                    <ListItemText primary={<span className="rowTitle">{s.name}</span>} />
                  </ListItemButton>
                  {idx !== seriesData.length - 1 && <div className="rowDivider" />}
                </li>
              ))}
            </List>
          </section>
        
          <div className="mid" aria-hidden="true" />

          <section className="right">
            <Typography variant="h5" className="sectionTitle">Cuper</Typography>

            <List className="list" aria-label="Lista över cuper">
              {cupsData.map((c, idx) => (
                <li key={c.id} className="listRow">
                  <ListItemButton
                    className="listItem"
                    onClick={() => openCup(c)}
                    disableRipple disableTouchRipple disableFocusRipple
                  >
                    <ListItemText primary={<span className="rowTitle">{c.name}</span>} />
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
