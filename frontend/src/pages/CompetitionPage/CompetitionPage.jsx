import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../../components/Navbar/NavBar";
import { Container, Typography, List, CircularProgress, Alert } from "@mui/material";
import AnimatedContent  from '../../components/AnimatedContent';
import CompetitionDetails from "./CompetitionDetails"; 
import "./CompetitionPage.css";
import "./GlassyButton.css";
import useSeriesStore from "../../store/seriesStore.js"

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
    loading : seriesLoading,
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
    if (type && id) {
      setSelection({ type, id, name });
    }
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
    const sel = { type: "series", id, name};
    setSelection(sel);
    window.history.pushState(sel, "", `/tavlingdetail?type=series&id=${id}&name=${encodeURIComponent(name)}`)
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
      
      <div className="banner">
        <div className="banner-left"></div>
        <div className="banner-right">
          <AnimatedContent>
            <h1 className="banner-title">Tävlingar</h1>
          </AnimatedContent>
          
        </div> 
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
              <AnimatedContent>
                <List className="list" aria-label="Lista över serier">
                  {series.length === 0 ? (
                    <li className="listRow" style={{ opacity: 0.8, padding: "8px 0" }}>
                      Inga serier hittades.
                    </li>
                  ) : (
                    series.map((s, idx) => (
                      <li key={s._id ?? s.id ?? idx} className="listRow">
                        <div className="button-wrap">
                          <div className="button-shadow"></div>
                          <button className="glassy-btn" onClick={() => openSeries(s)}>
                            <span>{getSerieName(s)}</span>
                          </button>
                        </div>
                        {idx !== series.length - 1 && <div className="rowDivider" />}
                      </li>
                    ))
                  )}
                </List>
              </AnimatedContent>
            )}
          </section>
        
          <div className="mid" aria-hidden="true" />

          <section className="right">
            <Typography variant="h5" className="sectionTitle">Cuper</Typography>
            <AnimatedContent>
              <List className="list" aria-label="Lista över cuper">
                {cupsData.map((c, idx) => (
                  <li key={c.id} className="listRow">
                    <div className="button-wrap">
                      <div className="button-shadow"></div>
                      <button className="glassy-btn" onClick={() => openCup(c)}>
                        <span>{c.name}</span>
                      </button>
                    </div>
                    {idx !== cupsData.length - 1 && <div className="rowDivider" />}
                  </li>
                ))}
              </List>
            </AnimatedContent>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default CompetitionPage;