import React, { useEffect, useState, useMemo } from "react";
import NavBar from "../../components/Navbar/NavBar";
import {
  Container, Typography, List, ListItemButton, ListItemText,
  CircularProgress, Alert
} from "@mui/material";
import CompetitionDetails from "./CompetitionDetails";
import "./CompetitionPage.css";
import useSeriesStore from "../../store/seriesStore.js";

const cupsData = [
  { id: "c1", name: "Svenska Cupen" },
  { id: "c2", name: "Göteborg Cup" },
  { id: "c3", name: "Eko Cup" },
  { id: "c4", name: "Hyundai Cup" },
];

const CompetitionPage = () => {
  const [selection, setSelection] = useState(null);

  const {
    fetchSeries,
    seriesList,
    loading: seriesLoading,
    error: seriesError,
  } = useSeriesStore();

  useEffect(() => {
    fetchSeries();
  }, [fetchSeries]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const id   = params.get("id");
    const name = params.get("name");
    if (type && id) setSelection({ type, id, name });
  }, []);

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

  const getSerieName = (s) => s?.name ?? s?.title ?? s?.serieName ?? "Okänd serie";
  const series = useMemo(() => (Array.isArray(seriesList) ? seriesList : []), [seriesList]);

  const openSeries = (item) => {
    const id = String(item._id ?? item.id);
    const name = getSerieName(item);
    const sel = { type: "series", id, name };
    setSelection(sel);
    window.history.pushState(sel, "", `/tavlingdetail?type=series&id=${id}&name=${encodeURIComponent(name)}`);
  };

  const openCup = (item) => {
    const sel = { type: "cup", id: String(item.id), name: item.name };
    setSelection(sel);
    window.history.pushState(sel, "", `/tavlingdetail?type=cup&id=${item.id}&name=${encodeURIComponent(item.name)}`);
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
        <Typography variant="h4" className="titleText">Tävlingar</Typography>
      </div>

      <Container maxWidth="lg" className="content">
        <div className="twoCol">
          <section className="left">
            <Typography variant="h5" className="sectionTitle">Serier</Typography>

            {seriesLoading && (
              <div style={{ padding: 8 }}>
                <CircularProgress size={24} /> Laddar serier…
              </div>
            )}

            {seriesError && (
              <Alert severity="error" sx={{ mb: 1 }}>
                Kunde inte hämta serier: {String(seriesError)}
              </Alert>
            )}

            {!seriesLoading && !seriesError && (
              <List className="list" aria-label="Lista över serier">
                {series.length === 0 ? (
                  <li className="listRow" style={{ opacity: 0.8, padding: "8px 0" }}>
                    Inga serier hittades.
                  </li>
                ) : (
                  series.map((s, idx) => (
                    <li key={s._id ?? s.id ?? idx} className="listRow">
                      <ListItemButton
                        className="listItem"
                        onClick={() => openSeries(s)}
                        disableRipple
                        disableTouchRipple
                        disableFocusRipple
                      >
                        <ListItemText primary={<span className="rowTitle">{getSerieName(s)}</span>} />
                      </ListItemButton>
                      {idx !== series.length - 1 && <div className="rowDivider" />}
                    </li>
                  ))
                )}
              </List>
            )}
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
                    disableRipple
                    disableTouchRipple
                    disableFocusRipple
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
