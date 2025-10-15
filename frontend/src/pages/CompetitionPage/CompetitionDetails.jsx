import React, { useEffect, useState } from "react";
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

const getTeamName = (team) => {
  if (!team) return "Okänt lag";
  if (typeof team === "string") return team; 
  return team.name ?? team.teamName ?? team.title ?? "Okänt lag";
};

export default function CompetitionDetails({ type, id, name, onBack }) {
  const { fetchSeriesById, selectedSeries, loading, error } = useSeriesStore();

  const [fakeStandings, setFakeStandings] = useState([]);

  useEffect(() => {
    if (type === "series" && id) {
      fetchSeriesById(id);

      const fakePointsTable = {
        table: [
          { team: "68e6a821bd5bf4e083b83f12", points: 30, scoreDifference: 25, playedGames: 10, wins: 10, draws: 0, losses: 0 },
          { team: "68e6a7e2bd5bf4e083b83f0f", points: 24, scoreDifference: 15, playedGames: 10, wins: 8,  draws: 0, losses: 2 },
          { team: "68e6a821bd5bf4e083b83f13", points: 18, scoreDifference: 5,  playedGames: 10, wins: 6,  draws: 0, losses: 4 },
          { team: "68e6a821bd5bf4e083b83f14", points: 12, scoreDifference: -5, playedGames: 10, wins: 4,  draws: 0, losses: 6 },
          { team: "68e6a821bd5bf4e083b83f15", points: 6,  scoreDifference: -15,playedGames: 10, wins: 2,  draws: 0, losses: 8 },
          { team: "68e6a821bd5bf4e083b83f16", points: 0,  scoreDifference: -25,playedGames: 10, wins: 0,  draws: 0, losses: 10 },
        ],
      };

      setFakeStandings(fakePointsTable.table);
    }
  }, [type, id, fetchSeriesById]);

  const displayName =
  type === "series"
    ? (selectedSeries?.name ??
       selectedSeries?.title ??
       selectedSeries?.serieName ??
       name ?? `#${id}`)
    : (name ?? `#${id}`);

  const formatDateTime = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    const date = d.toISOString().slice(0, 10);
    const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return `${time}, ${date}`;
  };

  const standingsToShow =
    Array.isArray(selectedSeries?.standings) && selectedSeries.standings.length > 0
      ? selectedSeries.standings
      : fakeStandings;

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
                    <th>#</th>
                    <th>Lag</th>
                    <th>MP</th>
                    <th>V</th>
                    <th>O</th>
                    <th>F</th>
                    <th>+/-</th>
                    <th>P</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(standingsToShow) && standingsToShow.length ? (
                    standingsToShow.map((row, idx) => (
                      <tr key={`${getTeamName(row.team)}-${idx}`}>
                        <td>{idx + 1}</td>
                        <td>{getTeamName(row.team)}</td>
                        <td>{row.playedGames ?? 0}</td>
                        <td>{row.wins ?? 0}</td>
                        <td>{row.draws ?? 0}</td>
                        <td>{row.losses ?? 0}</td>
                        <td>
                          {typeof row.scoreDifference === "number"
                            ? row.scoreDifference > 0
                              ? `+${row.scoreDifference}`
                              : row.scoreDifference
                            : 0}
                        </td>
                        <td>{row.points ?? 0}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} style={{ textAlign: "center" }}>
                        Ingen tabell tillgänglig.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <aside className="detailsSidebar">
          <div className="sidebarCard">
            <Typography variant="subtitle1" className="sidebarTitle">
              {displayName}
            </Typography>
            <Divider className="sidebarDivider" />

            <List className="sidebarList" aria-label="Snabblänkar">
              <li>
                <ListItemButton className="sidebarItem" onClick={() => console.log("table")}>
                  <ListItemText primary="Tabell och resultat" />
                </ListItemButton>
              </li>
              <li>
                <ListItemButton className="sidebarItem" onClick={() => console.log("schedule")}>
                  <ListItemText primary="Spelprogram" />
                </ListItemButton>
              </li>
              <li>
                <ListItemButton className="sidebarItem" onClick={() => console.log("player-stats")}>
                  <ListItemText primary="Spelarstatistik" />
                </ListItemButton>
              </li>
            </List>
          </div>
        </aside>
      </div>
    </Box>
  );
}
