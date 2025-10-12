import React, { useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import "./CompetitionDetails.css";
import useSeriesStore from "../../store/seriesStore.js";

export default function CompetitionDetails({ type, id, name, onBack }) {
  const { fetchSeriesById, selectedSeries, loading, error } = useSeriesStore();


  useEffect(() => {
    if (type === "series" && id) {
      fetchSeriesById(id);
    }
  }, [type, id, fetchSeriesById]);


  const getSerieName = (s) => s?.name ?? s?.title ?? s?.serieName ?? name ?? `#${id}`;

  const displayName = useMemo(() => {
    if (type === "series" && selectedSeries) return getSerieName(selectedSeries);
    return name ?? `#${id}`;
  }, [type, selectedSeries, name, id]);


  const formatDateTime = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    const date = d.toISOString().slice(0, 10); 
    const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return `${time}, ${date}`;
  };

 
  const sortedTable = useMemo(() => {
    const t = selectedSeries?.table ?? [];
    return t
      .slice()
      .sort((a, b) => {
        const p = (b.points ?? 0) - (a.points ?? 0);
        if (p !== 0) return p;
        const bDiff = (b.goalsFor ?? 0) - (b.goalsAgainst ?? 0);
        const aDiff = (a.goalsFor ?? 0) - (a.goalsAgainst ?? 0);
        return bDiff - aDiff;
      });
  }, [selectedSeries]);

  const handleSideClick = (key) => {
    console.log("Sidomeny klick:", key);
  };

  return (
    <Box sx={{ py: 2 }}>
      <div className="detailsLayout">
        <div className="detailsMain">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {displayName}
          </Typography>

          {type === "series" && (
            <Box sx={{ mb: 2 }}>
              {loading && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, py: 0.5 }}>
                  <CircularProgress size={20} />
                  <Typography variant="body2">Laddar serie…</Typography>
                </Box>
              )}
              {error && (
                <Alert severity="error">
                  Kunde inte hämta serie: {String(error)}
                </Alert>
              )}
            </Box>
          )}

          <Typography variant="h5" sx={{ fontWeight: 700, mt: 2 }}>
            Senaste matcherna
          </Typography>
          <div className="matchesPlaceholder">
            {selectedSeries?.matches?.length ? (
              selectedSeries.matches
                .slice() 
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 3) 
                .map((m, i) => (
                  <div key={`${m.homeTeam}-${m.awayTeam}-${i}`} className="matchRow">
                    {m.homeTeam} {m.homeGoals ?? "-"}–{m.awayGoals ?? "-"} {m.awayTeam} • {formatDateTime(m.date)}
                  </div>
                ))
            ) : (
              <div className="matchRow">Inga matcher ännu.</div>
            )}
          </div>

         
          <div className="tableSection">
            <Typography variant="h6" className="tableTitle">
              Tabell
            </Typography>
            <div className="tableCard">
              <table className="standingsTable">
                <thead>
                  <tr>
                    <th>PO</th>
                    <th>Lag</th>
                    <th>MP</th>
                    <th>V</th>
                    <th>O</th>
                    <th>F</th>
                    <th>GM</th>
                    <th>IM</th>
                    <th>+/-</th>
                    <th>P</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTable?.length ? (
                    sortedTable.map((t, idx) => {
                      const gf = t.goalsFor ?? 0;
                      const ga = t.goalsAgainst ?? 0;
                      const diff = gf - ga;
                      return (
                        <tr key={`${t.name}-${idx}`}>
                          <td>{idx + 1}</td>
                          <td>{t.name}</td>
                          <td>{t.played ?? 0}</td>
                          <td>{t.wins ?? 0}</td>
                          <td>{t.draws ?? 0}</td>
                          <td>{t.losses ?? 0}</td>
                          <td>{gf}</td>
                          <td>{ga}</td>
                          <td>{diff > 0 ? `+${diff}` : diff}</td>
                          <td>{t.points ?? 0}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={10} style={{ textAlign: "center" }}>
                        Ingen tabell tillgänglig.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <Box sx={{ mt: 3 }}>
            <Button variant="outlined" onClick={onBack}>
              ⟵ Tillbaka
            </Button>
          </Box>
        </div>

        <aside className="detailsSidebar">
          <div className="sidebarCard">
            <Typography variant="subtitle1" className="sidebarTitle">
              {displayName}
            </Typography>
            <Divider className="sidebarDivider" />

            <List className="sidebarList" aria-label="Snabblänkar">
              <li>
                <ListItemButton className="sidebarItem" onClick={() => handleSideClick("table")}>
                  <ListItemText primary="Tabell och resultat" />
                </ListItemButton>
              </li>
              <li>
                <ListItemButton className="sidebarItem" onClick={() => handleSideClick("schedule")}>
                  <ListItemText primary="Spelprogram" />
                </ListItemButton>
              </li>
              <li>
                <ListItemButton className="sidebarItem" onClick={() => handleSideClick("player-stats")}>
                  <ListItemText primary="Spelarstatistik" />
                </ListItemButton>
              </li>
              <li>
                <ListItemButton className="sidebarItem" onClick={() => handleSideClick("team-stats")}>
                  <ListItemText primary="Lagstatistik" />
                </ListItemButton>
              </li>
            </List>
          </div>
        </aside>
      </div>
    </Box>
  );
}
